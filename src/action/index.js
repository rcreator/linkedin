import db ,{ auth, provider, store } from '../firebase'
import { signInWithPopup } from "firebase/auth";
import { SET_USER, Article_Information, SET_LOADING_STATUS } from './actionType';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, onSnapshot ,query } from "firebase/firestore"; 



export const setUser = (payload) =>
({
    type: SET_USER,
    user: payload,
})

export const setLoading = (status) =>({
    type: SET_LOADING_STATUS,
    status: status,
})


export function signInAPI() 
{
    return (dispatch) => {
        signInWithPopup(auth, provider)
        .then((payload)=>{
            dispatch(setUser(payload.user));
        })
        .catch(error => alert(error.message));
    }
}

export function getUserAuth(){
    return (dispatch) =>
    {
        auth.onAuthStateChanged(async (user) =>
        {
            if(user)
            {
                dispatch(setUser(user));
            }
        });
    };
}

export function signOutAPI(){
    return(dispatch) =>
    {
        auth.signOut()
        .then(() =>{
        dispatch(setUser(null));
        }).catch(err => console.log(err))
    }
}

export function postArticleAPI(payload)
{
    return (dispatch) =>
    {
        dispatch(setLoading(true));
        if(payload.image != "")
        {
            const storageRef  = ref(store,'images/' + payload.image.name);
            const uploadTask = uploadBytesResumable(storageRef, payload.image);
            uploadTask
            .on('state_changed', (snapshot) => 
             {
    
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                switch (snapshot.state) 
                {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            
            (error) => console.log(error.code), 
              
            () => 
            {
                getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadURL) =>
                {
                    const docData = 
                    {
                        actor : 
                        {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            date: payload.timestamp,
                            image: payload.user.photoURL,
                        },
                        video: payload.video,
                        sharedImg: downloadURL,
                        comment: 0,
                        description: payload.description,
                
                    }
                    const newpostRef = doc(collection(db, "article"));
                    await setDoc(newpostRef, docData);
                })
                dispatch(setLoading(false))    
            }  
        )}
        else if (payload.video)
        {
            const docData = 
            {
                actor : 
                {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: "",
                comment: 0,
                description: payload.description,
        
            }
            const newpostRef = doc(collection(db, "article"));
            setDoc(newpostRef, docData); 
            dispatch(setLoading(false))

        }
    }
}

export const setArticle = (payload) =>
({
    type: Article_Information,
    articleInfo: payload,
})

export function storeArticle() 
{
   
    return (dispatch)=>
    {
        const q = query(collection(db, "article"));
        onSnapshot(q, (querySnapshot) => 
        {
            let articles =  querySnapshot.docs.map((doc) => doc.data())
            dispatch(setArticle(articles));
        });
    };

}

