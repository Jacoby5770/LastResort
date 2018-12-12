import React from 'react'
import {BrightspaceForm} from '../components'
import {postCourse, postAssignment} from '../store'
import {connect} from 'react-redux'
import history from '../history'

class AddBrightspace extends React.Component {
  submit = (credentials) => {
    // const currentCourseId = Number(this.props.match.params.courseId)
    // addedCategory.courseId = currentCourseId
    history.push(`/loading`)
    this.props.postAssignment(credentials)
  }

  render() {
    return <BrightspaceForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => {
  var letterMap = {
    'A+': 100,
    'A': 100,
    'B+': 88,
    'B': 85,
    'B-': 82,
    'C+': 78,
    'C': 75,
    'C-': 72,
    'D+': 68,
    'D': 65,
    'D-': 62,
    'F': 59
  }
  return {
    postAssignment: (credentials) => {
      var username = credentials.username;
      var password = credentials.password;
      var url = "http://3.17.41.214/get-grades?username="+username+"&password="+password;
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var dataJSON = xmlHttp.response;
            for (var i = 0; i < dataJSON.length; i++) {
        dataJSON[i].grades.id = i+1;
        for (var key in dataJSON[i].grades) {
          if (key === "className" || key === "id") {
            continue
          }
          console.log("HERE*******", key);
          var achieved = dataJSON[i].grades[key].achieved;
          var total = dataJSON[i].grades[key].total;
          if (achieved !== null && total !== null) {
            achieved = parseFloat(achieved);
            total = parseFloat(total);
            console.log('before')
            dispatch(postAssignment({"category": key, "gradeWeight": total/100, "grade": achieved/total*100, "categoryId": dataJSON[i].grades.id}, dataJSON[i].grades.id))
            console.log('after')
      
          } else {
            var classGrade = dataJSON[i].grades[key].grade;
            classGrade = classGrade.split(" ")[0];
            if (isNaN(parseFloat(classGrade))) {
              classGrade = letterMap[classGrade];
            } else {
              classGrade = parseFloat(classGrade);
            }
            dispatch(postAssignment({"category": key, "gradeWeight": 0.1, "grade": classGrade, "categoryId": dataJSON[i].grades.id}, dataJSON[i].grades.id))
         }  
        }
      }

      for (var i = 0; i < dataJSON.length; i++) {
        dataJSON[i].grades.id = i+1;
        dispatch(postCourse({"name": dataJSON[i].grades.className, "userId": null}))
      }
      history.push(`/home`)
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.responseType = 'json';
    xmlHttp.send(null);
    }

  }
}

export default connect(null, mapDispatchToProps)(AddBrightspace)