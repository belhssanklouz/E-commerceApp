import './Avatar.css';

function Avatar ({url,name}) {
    if(url){
        return(
            <img 
                className='avatar' 
                src={url}
                alt=''
            />
        )
    }

    const avatarAlphabet = name?.split(' ');
    return (
            <div className='avatar'>
                {avatarAlphabet.map(word=>word[0].toUpperCase())}
            </div>
    )
}
export default Avatar;