import React,{useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from './Header'
import Leftside from './Leftside'
import Main from './Main'
import Rightside from './Rightside'
import {connect} from "react-redux"


function Home(props) {  

    console.log(props.user)
    

    return (
        <div>
            <Header />
            <Container>
            {
             !props.user && <Navigate to ="/" />
             }
                <Section>
                    <h5><a>Hiring in a hurry? - </a></h5>
                    <p>Find telented pros in record time with Upwork and keep business moving</p>
                </Section>
                <Layout>
                        <Leftside />                            
                        <Main />                 
                        <Rightside />
                </Layout>
            </Container>
        </div>
    )
}

const mapStateProps = (state) =>
{
    return{
        user: state.userState.user
    };
}

export default connect(mapStateProps)(Home)


const Container = styled.div`

margin: 50px  0 20px 0 ;

`
const Section = styled.div`

display: flex;
flex-wrap: wrap ;
justify-content: center;
text-align: center;
align-items: center;
a{
    cursor:pointer;
    color: blue;
    flex-wrap: nowrap ;
}

@media(max-width: 768px)
{
    flex-direction: column;
    padding: 0 5px;
}
`
const Layout = styled.div`

display: grid;
grid-template-areas: "leftside main rightside";
grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(0, 7fr);
column-gap: 25px;
row-gap: 25px;
//grid-template-rows: auto;
margin: 25px 0;

@media (max-width: 768px)
{
    display: flex;
    flex-direction: column;
    padding: 0 5px;
}

`

