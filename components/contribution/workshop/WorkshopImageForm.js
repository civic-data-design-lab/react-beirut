import ImageUploadForm from '../general/imageUpload/ImageUploadForm';
import BooleanButtonForm from '../general/booleanButtonForm/BooleanButtonForm';
import {useMediaQuery} from 'react-responsive';
import {useTranslation} from "next-i18next";

import {useState, useEffect} from "react";

const Desktop = ({children}) => {
    const isDesktop = useMediaQuery({minWidth: 992})
    return isDesktop ? children : null
}
const Tablet = ({children}) => {
    const isTablet = useMediaQuery({minWidth: 651, maxWidth: 991})
    return isTablet ? children : null
}
const Mobile = ({children}) => {
    const isMobile = useMediaQuery({maxWidth: 650})
    return isMobile ? children : null
}
const Default = ({children}) => {
    const isNotMobile = useMediaQuery({minWidth: 768})
    return isNotMobile ? children : null
}

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {ARCHIVE_CONTRIBUTION_NAME} from "../../../lib/utils";

const WorkshopImageForm = ({
                               onUpdate,
                               formData,
                               formSchema,
                               title,
                               label,
                           }) => {
    const page = formSchema.pages.image_upload;
    const fields = page.fields;
    const {t} = useTranslation();

    const [numImageForm, setNumImageForm] = useState(1);

    useEffect(()=>{
        let storedNum = localStorage.getItem("numImageFormWorkshop")
        if (storedNum) {
            setNumImageForm(parseInt(storedNum))
            console.log("num is ", storedNum)
        }

    }, [])


    const [imageFormState, setImageFormState] = useState({});



    const updateImageFormState = (imageIndex, data) => {
        let newData = formData
        if (!newData.images) {
            newData.images = {}
        }
        newData.images[imageIndex] = data
        setImageFormState((prevForm) => {
            const updatedFormData = {...prevForm, ...newData};
            // console.log('setting ImageFormState to ', updatedFormData);
            onUpdate(updatedFormData);
            return updatedFormData;
        });
    };


    const shiftImagesUp = (index) => {
        let keys = Object.keys(formData.images)
        let newData = formData
        keys.map((key) => {
            if (key > index) {
                if (newData.images[key]) {
                    updateImageFormState(key - 1, newData.images[key])
                    updateImageFormState(key, {imageData: null, imageExtension: null})
                }
            }
        })
    }

    const shiftCaptionsUp = (index) => {
        let keys = Object.keys(formData.caption)
        let newData = formData
        keys.map((key) => {
            if (key > index) {
                if (newData.caption[key]) {
                    newData.caption[key - 1] = newData.caption[key]
                    newData.caption[key] = []
                    console.log("newData is ", newData)
                    onUpdate(newData)
                }
            }
        })


    }

    const shiftTagsUp = (index) => {
        let keys = Object.keys(formData.image_content)
        let newData = formData
        keys.map((key) => {
            if (key > index) {
                if (newData.image_content[key]) {
                    newData.image_content[key - 1] = newData.image_content[key]
                    newData.image_content[key] = []
                    console.log("newData is ", newData)
                    onUpdate(newData)
                }
            }
        })
    }


    return (
        <>
            <div className={'form'}>
                <div className={'form-title'}><h2>{t('Craft Workshop Image Upload')}</h2></div>
                <div className={'sections'}>



                    <div className="WorkshopImageForm">

                        {[...Array(numImageForm).keys()].map((num)=>{
                            return <div>
                                {numImageForm > 1 &&
                                    <div className={"delete-img-btn"}>
                                        <FontAwesomeIcon icon={faXmark} width={12}
                                                         onClick={() => {
                                                             if (!formData.images) {
                                                                 // if there images is not defined in the formData
                                                             } else {
                                                                 // if images is defined in formData then shift data up
                                                                 shiftImagesUp(num + 1)
                                                             }
                                                             setNumImageForm(numImageForm - 1)

                                                             if (!formData.image_content) {
                                                                 // if there are no tags at all
                                                             } else {
                                                                 // if there are some tags
                                                                 shiftTagsUp(num + 1)
                                                             }

                                                             if (!formData.caption) {
                                                                 // if there are no tags at all
                                                             } else {
                                                                 // if there are some tags
                                                                 shiftCaptionsUp(num + 1)
                                                             }


                                                         }}
                                        />
                                    </div>}
                            <ImageUploadForm
                                imageIndex={parseInt(num+1)}
                                onUpdate={onUpdate}
                                formData={formData}
                                dataLocation="images"
                                title=""
                                label={t("Upload an image of the craft workshop")}
                                imageRequired={true}
                                captionRequired={fields.caption.required}
                                fields={fields}
                            />
                            </div>
                        })

                        }

                        {numImageForm < 3 && <div className={"add-img-btn d-flex flex-row justify-content-center align-items-center w-100"}>
                            <button className={"hstg-btn-pill"}
                                    onClick={()=>{
                                        setNumImageForm(numImageForm+1)
                                        localStorage.setItem("numImageFormWorkshop", (numImageForm+1).toString())

                                    }}
                            ><FontAwesomeIcon icon={faPlus} width={16}/></button>
                        </div>}
                        {/*<ImageUploadForm
                            imageIndex={'2'}
                            onUpdate={onUpdate}
                            formData={formData}
                            dataLocation="images"
                            title=""
                            label={t("Upload an image of the craft workshop")}
                            imageRequired={true}
                            captionRequired={fields.caption.required}
                            fields={fields}
                        />
                        <ImageUploadForm
                            imageIndex={'3'}
                            onUpdate={onUpdate}
                            formData={formData}
                            dataLocation="images"
                            title=""
                            label={t("Upload an image of the craft workshop")}
                            imageRequired={true}
                            captionRequired={fields.caption.required}
                            fields={fields}
                        />*/}
                    </div>

                    {/* TODO: Fix this ugly space that is here for whatever reason. */}
                    {/*<Desktop>
                        <div className={'vr'}></div>
                    </Desktop>
                    <Mobile>
                        <hr/>
                    </Mobile>
                    <Tablet>
                        <hr/>
                    </Tablet>*/}
                    {/*<div className={'section'}>
                        <div className={'subsection'}>
                            <h3 className={'Contribute-form-section-heading'}>{t('Image Tags')}</h3>
                            <BooleanButtonForm
                                onUpdate={
                                    onUpdate
                                }
                                formData={formData}
                                dataLocation="image_content"
                                title="Image Content"
                                label={t("What is shown in this image?")}
                                defaultTags={[
                                    'Storefront',
                                    'Street view',
                                    'Craftsperson',
                                    'Craft object',
                                    'Other outdoor space',
                                ]}
                                hasOtherField={true}
                                required={fields.image_content.required}
                            />
                        </div>
                    </div>*/}
                </div>
            </div>
        </>
    );
};

export default WorkshopImageForm;
