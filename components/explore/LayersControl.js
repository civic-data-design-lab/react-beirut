import React from "react";

export default class LayersControl extends React.Component {

    constructor(props) {
        super(props);
        this.clickLayerButton = this.clickLayerButton.bind(this)



    }

    clickLayerButton (e) {
        let layerName = e.target.id;
        this.props.updateMapLayer(layerName)
    }

    getMapLayerButtons = () => {
        let buttons = []
        for (const [key, value] of Object.entries(this.props.allLayers)) {
        buttons.push(
            <>
                <div key={key} className={'lc-section lc-button-section'}>
                    <div className={'lc-button-section'}>
                        <button className={'mapLayerButtons'} key ={key} id={key} onClick={this.clickLayerButton}>
                        <p style={{margin:'24px'}} className={'mapLayerButtonText'} id={key} onClick={this.clickLayerButton}> {key} </p>
                        <p style={{margin:'24px'}} className={'mapLayerButtonText'} id={key} onClick={this.clickLayerButton}> {value} </p>
                        </button>

                    </div>

            </div>
            <hr/>
                </>
        )
        }

        return buttons
    }


    onReset = () => {
        this.props.updateMapLayer(null)

    }





    render () {
        return (
            <>
            <div className={'layersControl-container'}>
                <div className={'searchby-section lc-section'} style={{padding:'24px'}}>

                        <p style={{margin:0, padding: 0}}>Historical Maps</p>
                        <button style={{height: "10%"}} className={'close-filter-btn'} onClick={this.props.closeLayersControl}>X</button>
                </div>
                <hr/>
                {this.getMapLayerButtons()}

                <div className={'reset-section lc-section'}>
                        <button className={'reset-btn'} onClick = {this.onReset}> Reset Maps </button>
                </div>

            </div>
            <div className={'arrow-down'} style={{left:'9.5%'}}/>

            </>
        )
    }
}