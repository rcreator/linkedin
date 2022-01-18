import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PostModal from "./PostModel"
import {connect} from "react-redux"
import { storeArticle } from "../action"
import ReactPlayer from 'react-player'

function Main(props) {

    const [postModel, setPostMode] = useState(false);
    useEffect(()=>
    {
        props.storeArticle();
        
    },[]);

    return (
        <>{
        
            props.articleInfo.length === 0 
            ?
            <p>There is not article</p> 
            :   <Container>            
                <ShareBox> 
                <div>
                    { props.user ? <img src={props.user.photoURL}/> : <img  src="images/user.svg"/>}
                    <button onClick={() => setPostMode(true)}
                    disabled={props.loading ? true : false}>Start a post</button>
                </div>
                <div>    
                    <button><img  src="images/photo.svg"/><span>Photo</span></button>
                    <button><img  src="images/photo.svg"/><span>Video</span></button>
                    <button><img  src="images/photo.svg"/><span>Event</span></button>
                    <button><img  src="images/photo.svg"/><span>Write Article</span></button>
                </div>
            </ShareBox>
                <Content>
                {props.loading && <img src="images/512x512.gif"/>} 

                {
                    props.articleInfo.length > 0 && props.articleInfo.map((articleInfo, key) => (           
                    <Article key={key}>
                    <SharedActor>
                        <a>
                            { props.articleInfo[0].actor.image ? <img src={props.articleInfo[0].actor.image}/> : <img  src="images/user.svg"/>}
                            <div>
                                <span>{articleInfo.actor.title}</span>
                                <span>{articleInfo.actor.description}</span>
                                <span>{articleInfo.actor.date.toDate().toLocaleDateString()}</span>
                            </div>
                        </a>
                        <button>
                            <img src="images/icons8-ellipsis-90.png" />
                        </button>

                    </SharedActor>
                    <Description>{articleInfo.description}</Description>
                        <SharedImg>
                            <a>
                                {
                                    !articleInfo.sharedImg && articleInfo.video 
                                    ? <ReactPlayer width= {'100%'} url={articleInfo.video}/>
                                    : <img src={articleInfo.sharedImg} />
                                }
                            </a>
                        </SharedImg>
                        <SocialCount>
                            <li>
                                <button>
                                    <img src="images/icons8-like-256.png" />                                     
                                    <img src="images/icons8-clapping-120.png"/>
                                    <span>75</span>
                                </button>
                            </li>
                            <li>
                                <a>2 comments</a>
                            </li>
                        </SocialCount>
                        <SocialAction>
                        <button>
                            <img src="images/icons8-like-256.png" />
                            <span>Like</span>
                        </button>
                        <button>
                            <img src="images/icons8-comment-234.png" />
                            <span>Comment</span>
                        </button>
                        <button>
                            <img src="images/icons8-share-240.png" />
                            <span>Share</span>
                        </button>
                        <button>
                            <img src="images/icons8-send-98.png" />
                            <span>Send</span>
                        </button>
                        </SocialAction>
                    </Article>
                ))}
            </Content>
            
            
            {postModel ? <PostModal setPostModel = {(item)=> {setPostMode(item)}}/> : ("")}
            
        </Container>
        }
        </>
    )
}

const mapStateProps = (state) =>
{
    return{
        user: state.userState.user,
        loading: state.articleState.loading,
        articleInfo : state.articleState.articleInfo
    };
}

const mapDispatchToProps = (dispatch) =>
({
    storeArticle : () => dispatch(storeArticle()),
})

export default connect(mapStateProps,mapDispatchToProps)(Main)




const Container = styled.div`
grid-area: main;
`

const CommonCard = styled.div`
text-align: center;
overflow: hidden;
margin-bottom: 8px;
background-color: #fff;
border-radius: 5px;
position: relative;
border: none;
box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`
const ShareBox = styled(CommonCard)`
display: flex;
flex-direction: column; 
color: #958b7b;
margin: 0 0 8px;
background: white;
div{
    button{
        outline: none;
        color: rgba(0,0,0,0.6);
        font-size: 14px;
        line-height: 1.5;
        min-height: 48px;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        font-weight: 600;   
    }

    &:first-child{
            display: flex;
            align-items: center;
            padding: 8px 16px 0px 16px;
            img{
                width: 48px;
                border-radius: 50%;
                margin-right:8px;    
            }
            button{
                margin: 4px 0;
                border-radius:35px;
                padding-left:16px;
                width: 100%;
                border: 1px solid gray;
            }
        }

    &:nth-child(2){
        display: flex;
        flex-wrap:wrap;
        justify-content: space-around;
        padding-bottom: 4px;

        button{
            img{
                margin: 0px 4px 0px -2px;
                width: 24px;
            }
            span{
                color: #78b5f9
            }
        }

    }
}
`

const Article = styled(CommonCard)`
padding: 0;
margin: 0 8px;
overflow: visible;

`

const SharedActor = styled.div`
padding-right: 40px;
flex-wrap: nowrap;
padding: 12px 16px 12px 16px;
margin-bottom: 8px;
align-items: center;
display: flex;

button{
    background-color: transparent;
    border:none;
    outline: none;


    img{
        width: 15px;
        height: 15px;
        background-color: white;
    }
}

a{
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img{
        width:48px;
        height: 48px;
    }
    div{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 0 12px;
        overflow: hidden;
        flex-grow: 1;
        flex-basis: 0;

        span{
            text-align: left;
            color: rgba(0,0,0,0.6);
            font-size: 12px;

            &:first-child{
                font-weight: 700;
            }
        }
    }
}
`
const SharedImg = styled.div`
margin-top: 8px;
width: 100%;
display: block;
position: relative;
background-color: #f9fafb;
img{
    object-fit:contain;
    width: 100%;
    height: 100%;

}
`

const Description = styled.div`
padding: 0 16px;
overflow: hidden;
font-size: 14px;
text-align: left;
`

const SocialCount = styled.ul`
list-style: none;
display: flex;
padding: 8px 0;
line-height: 1.3;
border-bottom: 1px solid #e9e5df;
overflow: auto;

li{
    button
    {
        display: flex;
        border: none;
        align-items: center;
        background: transparent;
        img{
            width: 20px;
            margin: 0 4px;
        }
        span{
            margin-left: 4px;
        }
    } 
    
    
    &:nth-child(2){
        a{
            font-size:14px;
            text-decoration: none;
            color: rgba(0,0,0,0.9);

        }
    }
}


`

const SocialAction = styled.div`

display: flex;
flex-wrap:wrap;
padding: 8px;

button
{
    display: flex;
    border: none;
    align-items: center;
    background: transparent;
    margin: 0 8px;
    img{
        width: 24px;
    }
    span{
        margin-left: 4px;

        &:hover{
            color: blue;
        }
    }

}

`

const Content = styled.div`
text-align: center;
 & > img{
     width: 45px;
     position: absolute;
     z-index: 98989;
     top: 30%;
     left:50%;
     transform: translate(-50%);

 }
`
