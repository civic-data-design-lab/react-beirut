import ImageUploadForm from '../general/imageUpload/ImageUploadForm';
import BooleanButtonForm from '../general/booleanButtonForm/BooleanButtonForm';
import {useMediaQuery} from 'react-responsive';
import {useTranslation} from "next-i18next";

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

    return (
        <>
            <div className={'form'}>
                <div className={'form-title'}><h2>{t('Craft Workshop Image Upload')}</h2></div>
                <div className={'sections'}>


                    <div className="WorkshopImageForm">

                        <ImageUploadForm
                            imageIndex={'1'}
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
                        />
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
