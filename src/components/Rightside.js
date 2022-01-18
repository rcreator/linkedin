import React from 'react'
import styled from 'styled-components'

function Rightside() {
    return (
        <Container>
          <FollowCard>
            <Title>
              <h2>
                Add to your feed
              </h2>
              <img src="images/feed-icon.svg"/>
            </Title>
            <FeedList>
              <li>
                <a>
                  <Avatar />
                  </a>
                  <div>
                    <span>#Linkedin</span>
                    <button>Follow</button>
                  </div>              
              </li>
              <li>
                <a>
                  <Avatar />
                  </a>
                  <div>
                    <span>Video</span>
                    <button>Follow</button>
                  </div>              
              </li>
            </FeedList>
            <Recommendation>
              View All Recommendation
              <img src="images/right-icon.svg"/>
              </Recommendation>
          </FollowCard>
        </Container>
    )
}

export default Rightside


const Container = styled.div`
grid-area: rightside;
`
const FollowCard = styled.div`
text-align:center;
overflow: hidden;
margin-bottom: 8px;
background-color: #fff;
border-radius: 5px;
position: relative;
border: none;
padding: 12px;

`

const Title = styled.div`
display: inline-flex;
align-items: center;
justify-content: space-between;
font-size: 16px;
width: 100%;
color: gray;
`

const FeedList = styled.ul`
list-style:none;
margin-top: 16px;
li{
  display: flex;
  align-items: center;
  margin: 12px 0;
  position: relative;
  font-size: 14px;
  div{
  display: flex;
    flex-direction: column;

}

button{
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 600;
  border-radius: 15px;
  outline: none;
  padding: 16px;
  max-height: 32px;
  border: lightblue 2px solid;

}}
`
const Avatar = styled.div`
background-image: url("images/user.svg");
background-position: center;
background-repeat: no-repeat ;
width: 48px;
height: 48px;
margin-right: 8px;
`

const Recommendation = styled.div`

color:#0a66c2;
display: flex;
align-items:center;
font-size: 14px;
`