import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AllCategory extends React.Component {
    render() {
         console.log('in all cateogry checking for props', this.props)
        return (
            <div>
                <Link
                    to="/category/add"
                >
                    Add Category
            </Link>
                {this.props.category.map(individualCat => (
                    <Link key={individualCat.id} to={`/category/${this.props.course.id}/${individualCat.category}`}>
                        <div className="card-content">
                            {individualCat.category}
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}

export default connect(null)(AllCategory)

