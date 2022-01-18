import React, {useState} from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { postArticleAPI } from "../action/index"
import { Timestamp } from "firebase/firestore"


function PostModel(props) {

    const[editorText, setEditorText] = useState('');
    const[shareImage,setShareImage] = useState("");
    const[videoLink,setVideoLink] = useState("");
    const[assetArea,setAssetArea] = useState("");

    const handleChange = (e) =>{
        const image = e.target.files[0];

        if(image === "" || image === undefined){
            alert(`not an image, the file is a ${typeof image}`);
        }
        setShareImage(image);
    };
    
    const switchAssetArea = (area)=>
    {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    }

    const postArticles = (e) =>
    {

    e.preventDefault();
    if(e.target !== e.currentTarget)
    {
        return;
    }

    const payload =
    {
        image:shareImage,
        video: videoLink,
        user: props.user,
        description: editorText,
        timestamp: Timestamp.now(),
    };
    props.postArticle(payload);
    reset();
    props.setPostModel(false)
    }
    

    const reset = () =>{
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");

    }

    return (
        <Container >
            <Content>
                <Header>
                    <h2>
                        Create a post
                    </h2>
                    <button onClick ={()=> props.setPostModel(false)}>
                        <img src="/images/close.png"/>
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        {props.user.photoURL ? <img src={props.user.photoURL}/> : <img src="images/user.svg"/>}
                        <span>{props.user.displayName ? props.user.displayName : "Name"}</span>

                    </UserInfo>
                    <Editor>
                    <textarea
                    value={editorText}
                    onChange={(e) =>setEditorText(e.target.value)}
                    placeholder='What do u want to talk about?'
                    autoFocuse= {true}></textarea>



                    { assetArea === "image" ?
                    <UploadImages>
                        <input 
                            type="file" 
                            accept="image/gif, image/jpeg, image/png"
                            name= "image"
                            id="file"
                            style={{display: 'none',}}
                            onChange={handleChange}
                            />
                        <p>
                            <label htmlFor='file'>Select an image to share</label>
                        </p>
                        {shareImage && <img src={URL.createObjectURL(shareImage)} />}
                    </UploadImages> 
                    : assetArea === "media" &&
                    <Video>
                        <input 
                        type="text"
                        placeholder= "Please input a video link"
                        value={videoLink}
                        onChange= {(e) => setVideoLink(e.target.value)}/>
                        {videoLink && (
                            <ReactPlayer width={"100%"} url={videoLink} />
                        )}
                    </Video>
                    
                    }           

                    </Editor>
                </SharedContent>
                <ShareCreation>
                    <AttachAssets>
                        <AssetButton onClick={() => switchAssetArea("image")}>
                            <img src="/images/image.png" />
                        </AssetButton>
                        <AssetButton onClick={() => switchAssetArea("media")}>
                            <img src="/images/video.png" />
                        </AssetButton>
                        <ShareComment>
                            <AssetButton>
                                <img src="/images/comment.png" />
                                Anyone
                            </AssetButton> 
                        </ShareComment>

                        <PostButton
                        disabled={!editorText ? true : false}
                        onClick ={(event) => postArticles(event)}
                            >
                            Post
                        </PostButton>
                    </AttachAssets>
                </ShareCreation>
            </Content>
        </Container>
    )
}

const mapStateProps = (state) =>
{
    return{
        user: state.userState.user
    };
}

const mapDispatchToProps = (dispatch) =>({
    postArticle : (payload) => dispatch(postArticleAPI(payload)),
    
})

export default connect(mapStateProps, mapDispatchToProps)(PostModel)



const Container = styled.div`
position: fixed;
top:0;
left: 0;
bottom: 0;
z-index: 9999;
background: rgba(0,0,0,0.6);
width: 100%;
animation: fadeIn 0.3s;
`

const Content = styled.div`
width: 100%;
max-width: 552px;
background-color: white;
border-radius: 4px;
max-height: 98%;
overflow: initial;
display: flex;
flex-direction: column;
position: relative;
top: 32px;
margin: 0 auto;
`
const Header = styled.div`
padding: 8px;
display: block;
line-height: 1.5;
color: gray;
border-bottom: gray;
font-size:14px;
display: flex;
justify-content: space-between;
align-items:center;

button{
    background: none;
    border: none;
    display: flex;
    align-items:center;
    img{
        pointer-events: none; 
        width: 20px;
    }
}
`


const SharedContent = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
overflow-y: auto;
vertical-align: baseline;
background: transparent;
padding: 8px 12px;


`

const UserInfo = styled.div`
display: flex;
align-items: center;
padding: 12px 24px;

svg,img{
    width: 48px;
    height: 48px;
    border-radius: 50%; 
}

span{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }

`

const ShareCreation = styled.div`
dispaly: flex;
justify-content:space-between;
padding: 12px 24px 12px 16px; 
`

const AttachAssets = styled.div`
display: flex;
align-items: center;
padding-right: 8px;
position: relative;
`

const AssetButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
background: lightgreen;
width: 50px;
height: 50px;
border-radius: 10px;
margin-right: 15px;
img{
    width: 35px;
}
`
const ShareComment = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
border-left: 1px solid black;
padding: 0 15px;
${AssetButton}{
    width: 100%;
    padding: 0 5px;
    color: black;
}
`

const PostButton = styled.button`
padding: 5px 15px;
position: absolute;
right: 0;
border-radius: 7px;
display: flex;
align-items: center;
background: ${props => props.disabled ? 'rgba(0,0,0,0.8)' : '#0a66c2'};
color: white;   

`
const Editor = styled.button`
padding: 12px 24px;
display: flex;
flex-direction: column;
background: transparent;
border: none;
textarea{
    width: 100%;
    min-height:100px;
    resize: none;
}

input{
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
}


`

const UploadImages = styled.div`
width: 100%;
text-align: center;
img{
    width: 100%;
}
p{
    padding: 4px;
    font-weight: 600;
    color: blue;
    &:hover{
        color: green;
    }
}


`

const Video = styled.div`
width: 100%;
padding:4px 0;
display: flex;
flex-direction: column;
input{
    width: 100%;;
}

`
