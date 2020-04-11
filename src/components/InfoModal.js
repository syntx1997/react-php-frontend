import React, { Component } from 'react'

export class InfoModal extends Component {
    render() {
        if(!this.props.infoModalState) {
            return null;
        } else {
            return (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title has-text-centered">{ this.props.title }</p>
                        </header>
                        <section className="modal-card-body">
                        <p>
                            <b className="has-text-centered">
                                { this.props.message }
                            </b>
                        </p>
                        </section>
                    </div>
                    <button className="modal-close is-large" onClick={ this.props.closeModal }>x</button>
                </div> 
            )
        }
    }
}

export default InfoModal
