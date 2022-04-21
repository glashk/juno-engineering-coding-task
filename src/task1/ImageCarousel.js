import { useState, useEffect ,useCallback} from "react";
import { fetchImageUrls, fetchImage } from "../api/index";

const ImageCarousel = (props) => {
    const [imageIndex, setmageIndex] = useState(0)
    const [imgUrl, setImgUrl] = useState('')
    const [allImgUrl, setAllImgUrl] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(async () => {
        const urls = await fetchImageUrls()
        setAllImgUrl(urls)
    }, [])


    const fetchImg = async () => {
        setIsLoading(true)
        const nextImg = await fetchImage(imageIndex)
        setImgUrl(nextImg)
        setIsLoading(false)
    }
    
    useEffect(() => {
       fetchImg()
    }, [imageIndex])

    const backHandler = () => { 
        if(imageIndex === 0){
            setmageIndex(allImgUrl.length - 1)
        }else{ 
            setmageIndex(imageIndex-1)
        }
    }

    const nextHandler = () => { 
        console.log(imageIndex === allImgUrl.length - 1);
        if(imageIndex === (allImgUrl.length - 1)){
            setmageIndex(0)
        }else{
            setmageIndex(imageIndex + 1)
        }
    }

    return (
        <>
            <h1 >Your code goes here</h1>

            <div className='main-container'>
                <div onClick={backHandler}> Back </div>

                <div className='imgContainer'>
                    {isLoading ?
                        <div class="loader" /> 

                        : 
                       <img className='imageee' src={imgUrl} />
                        }
                </div>
                <div onClick={nextHandler}>Next</div>

            </div>

        </>
    )
};
export default ImageCarousel;
