import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Modal } from 'semantic-ui-react'
// import { AllAssignment } from '../components';

class AllCategory extends React.Component {
    render() {
        console.log('in all category', this.props.category)
        return (
            <div>
                {this.props.category.map(individualCat => (
                    <Modal key={individualCat.id} trigger={<Button>Show All {individualCat.category}</Button>}>
                    <Modal.Header>
                        {individualCat.category}
                    </Modal.Header>
                    <br />
                </Modal>
                ))}
            </div>
        )
    }
}

export default connect(null, null)(AllCategory)

