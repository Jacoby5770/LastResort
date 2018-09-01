import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AllCategory extends React.Component {
    render() {
        console.log('in all cateogry checking for props', this.props)
        return (
            <div>
                    <br />
                        {this.props.category.map(individualCat => (
                            <div key={individualCat.id} className="collection center-align">
                                <div className="flow-text truncate collection-item">
                                    <Link key={individualCat.id} to={`/category/${this.props.course.id}/${individualCat.id}`}>
                                        <div className="card-content black-text">
                                            {individualCat.category}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                  
            </div>
        )
    }
}

export default connect(null)(AllCategory)

