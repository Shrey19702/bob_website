const Hello = () => {

    let x = 'Facebook ID = '+process.env.FACEBOOK_ID;
    console.log(x);

    return (
        <h1 className=" p-80">
            Hello
        </h1> 
    );
}
 
export default Hello;