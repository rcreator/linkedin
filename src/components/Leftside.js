import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

function Leftside(props) {
    return (
        <Container>
            <ArtCard>
                <UserInfo>
                    <CardBackground />
                        <a>
                            <Photo />
                            <Link>Welcome, {props.user && props.user.displayName ? props.user.displayName : 'there' }!</Link>
                        </a>
                        <a>
                            <AddPhotoText>
                                Add a Photo
                            </AddPhotoText>
                        </a>  
                </UserInfo>
                <Widget>
                    <a>
                        <div>
                        <span>Connection</span>
                        <span>Grow Your Network</span>
                        </div>
                        <img  src= "images/widget-icon.svg"/>
                    </a>
                </Widget>
                <Item>
                    <span>
                        <img src="images/item-icon.svg"/>
                        My Item
                    </span>
                </Item>

                
            </ArtCard>
            <CommunityCard>
                <a>
                    <span>Groups</span>
                </a>
                <a>
                    <span>
                    Events
                    <img src="/images/plus-icon.svg"/>
                    </span>
                    
                </a>
                <a>
                    <span>Follow Hashtages</span>
                </a>
                <a>
                    <span>Discover more</span>
                </a>
            </CommunityCard>
            
            
        </Container>
    )
}

const mapStateProps = (state) =>
{
    return{
        user: state.userState.user
    };
}


export default connect(mapStateProps)(Leftside)


const Container = styled.div`
grid-area: leftside;
`

const ArtCard = styled.div`
text-align: center;
overflow: hidden;
margin-bottom: 8px;
background-color: #fff;
border-radius: 5px;
transition: box-shadow 83ms;
position: relative;
border: none;
`

const UserInfo = styled.div`
border-bottom: 1px solid rgba(0,0,0, 0.15);
padding: 12px 12px 16px;
word-wrap: break-word;
word-break: break-word;


`

const CardBackground = styled.div`
background: url('images/card-bg.svg');
background-position: center;
background-size: 462px;
height: 54px;
margin: -12px -12px 0;
`

const Photo = styled.div`
box-shadow: none;
background-image: url('images/photo.svg');
width: 72px;
height: 72px;
background-position: center;
background-size: 60%;
background-repeat: no-repeat;
background-color: white;
border: 2px solid white;
margin: -38px auto 12px;
border-radius: 50%
`
const Link = styled.div`
font-size: 16px;
line-height: 1.5;
font-weight: 600;
`
const AddPhotoText = styled.div`

color: #0a66c2;
margin-top: 4px;
font-size: 12px;
line-height: 1.33;
font-weight: 400;

`

const Widget = styled.div`

border-bottom: 1px solid rgba(0,0,0,0.15) ;
padding: 12px 0 12px 0;
a{
    display: flex;
    padding: 4px 12px;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;

    &: hover{
        background-color: rgba(0,0,0,0.08);
    }
div{
    display: flex;
    flex-direction: column;
    align-items: start;

    span{
        font-size: 12px;
        line-height: 1.333;
        &:first-clild {
            color: rgba(0,0,0,0.6);        
        }
        &:nth-clild(2) {
            color: rgba(0,0,0,1);        }
    }

}
}

`

const Item = styled.a`
border-color: rgba(0,0,0,0.8);
text-align: left;
padding: 12px;
font-size: 12px;
display: block;

span{
    display: flex;
    align-items: center;
}
`

const CommunityCard = styled(ArtCard)`

display: flex;
flex-direction: column;
text-align:start;
padding: 0 12px;
a{
    color: black;
    padding: 4px 0 ;
    &: hover
    {
        color: #0a66c2;
    }

    img{
        margin-left: auto;   
    }

    span{
        font-size: 12px;
        line-height: 1.333;
        display: flex;
        align-items: center;
        justify-content: space-between;       
    }

    &:last-child 
    { 
            color: gray;
            text-decoration: none;
            border-top: 1px solid #d6cec2;
            padding: 12px 0;
        &:hover{
            background-color: rgba(0,0,0,0.08);
        }
    }
}


`