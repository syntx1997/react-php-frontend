import React, { Component } from 'react'
import PropTypes from 'prop-types';
import InfoModal from './InfoModal';

var Modal = ({ modalState, closeModal, onChange, addData, onSubmit }) => {
    if(!modalState) {
        return null;
    }

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <form onSubmit={ onSubmit }>
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add Data</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">First Name</label>
                            <div className="control">
                                <input className="input" type="text" name="firstname" 
                                value={ addData.firstname } 
                                onChange={ onChange }
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Middle Name</label>
                            <div className="control">
                                <input className="input" type="text" name="middlename"
                                value={ addData.middlename }
                                onChange= { onChange }
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Last Name</label>
                            <div className="control">
                                <input className="input" type="text" name="lastname"
                                value={ addData.lastname }
                                onChange={ onChange }
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="email" name="email" placeholder="@"
                                value={ addData.email }
                                onChange={ onChange }
                                />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" type="submit">Add</button>
                    </footer>
                </form>
            </div>
            <button className="modal-close is-large" onClick={ closeModal }>x</button>
        </div>  
    );
};


export class AddData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalState: false,
            infoModalState: false,
            addData: 
                {
                    firstname: ' ',
                    middlename: ' ',
                    lastname: ' ',
                    email: ' '
                }
        }

        this.toggleInfoModal = this.toggleInfoModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        let data = this.state.addData;
        this.props.submitData(data.firstname, data.middlename, data.lastname, data.email);

        this.setState({
            addData: {
                firstname: '',
                middlename: '',
                lastname: '',
                email: ''
            }
        });

        this.toggleModal();
        this.toggleInfoModal();
    }

    toggleModal() {
        this.setState((prev, props) => {
            const newState = !prev.modalState;
            return { modalState: newState }
        });
    }

    toggleInfoModal() {
        this.setState((prev, props) => {
            const newState = !prev.infoModalState;
            return {
                infoModalState: newState
            }
        })
    }

    onChange = (e) => {
        const val = e.target.value

        this.setState({
           addData: {
               ...this.state.addData,
               [e.target.name]: val
           }
        })
    }

    render() {
        return (
            <div>
                <button style={ ButtonStyle } className="button is-dark" onClick={ this.toggleModal }> 
                    <span className="icon">
                        <i className="fa fa-plus"></i>
                    </span>
                    <label style={ LabelStyle } className="label">Add Data</label>
                </button>
                <Modal modalState={ this.state.modalState }
                        closeModal={ this.toggleModal }
                        onChange={ this.onChange }
                        addData={this.state.addData}
                        onSubmit={ this.onSubmit }
                        />
                <InfoModal infoModalState={ this.state.infoModalState }
                closeModal={ this.toggleInfoModal }
                message="Data successfully added to database!"
                title="Data Added"
                />
            </div>
        )
    }
}

const ButtonStyle = {
    marginBottom: '10px'
}

const LabelStyle = {
    color: '#fff'
}


AddData.propTypes = {
    submitData: PropTypes.func.isRequired
}


export default AddData
