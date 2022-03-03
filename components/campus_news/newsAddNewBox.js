import { fetchWrapper } from "../../tools/fetchWrapper";
import newsDTO, {JSONToInstance, ObjectToInstance} from "../../DTO/campus_news";
import { useLoggedUserData } from "../../tools/helper";
import {useState} from "react";
import { useSWRConfig } from "swr";
import {Row, Col} from "react-bootstrap";
import styles from "../../styles/newsMap.module.css";
import Button from "react-bootstrap/Button";

export default function NewsAddNewBox(props){
    const[title, setTitle] = useState("")
    const[content, setContent] = useState("")
    const { user } = useLoggedUserData()
    const { mutate } = useSWRConfig()

    function addMarker() {
         const longitude = props.longitude;
         const latitude = props.latitude;
         const user_email = user.email;
         if(longitude&&latitude&&title&&content){
             /*Connect to DB and send data*/
             const dto = new newsDTO(0, user_email, latitude, longitude, 0, title, content)
             fetchWrapper.post('http://localhost:3000/api/campus_news/add_new',
                 dto).then(resData => {
                     //console.log(resData.message)
                     setTitle("");
                     setContent("");
                     props.reset();
                     mutate('http://localhost:3000/api/campus_news/all_posts')
                     alert("Your post has been created successfully!")
                 }).catch(error => {
                     console.error(error)
                 })
         }else {
             alert("you must fill in the required field or select a location to post this campus news!")
         }
    }

    function handleChange (event) {
        if (event.target.name=="newsTitle"){
             setTitle(event.target.value)
        }
        else if (event.target.name=="newsContent") {
            setContent(event.target.value)
        }
    }

    return(
        <>
            <Col>
                <br/>
                <Row><span className={styles.titleText}>Post the Latest Campus News Here</span></Row>
                <Row>
                    <Col style={{textAlign:"right"}}>
                        <label>
                            News Title:
                        </label>
                    </Col>
                    <Col style={{textAlign:"left"}}>
                        <label>
                            <input type="text" name= "newsTitle" value={title} onChange={handleChange} />
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col style={{textAlign:"right"}}>
                        <label>
                            News Content:
                        </label>
                    </Col>
                    <Col style={{textAlign:"left"}}>
                        <label>
                            <textarea type="text" rows="3" name= "newsContent" value={content} onChange={handleChange}/>
                        </label>
                    </Col>
                </Row>
                <Row>
                    <span>Don't forget to select your post location on the map before you submit!</span>
                </Row>
                <Button onClick={addMarker} style={{display:"inline-block", margin:"1em", background:"#7BA1C7"}}>Post a Campus News</Button>
            </Col>
        </>
    )
}