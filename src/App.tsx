import isEmail from 'validator/lib/isEmail';
import Giphy from '~/assets/img/giphy.gif';
import EYE from '~/assets/svg/eye.svg';
import IMAGE from '~/assets/img/image.jpg';
import Counter from '@/Counter';

// const NAME = process.env.name;

const App = () => {
   const how = 'hello'; // ESlint works (:

   return (
      <>
         <h1>Hello world !! -- {'NAME'} </h1>
         <h2>
            {isEmail('mourad@mail.com')
               ? 'yes this is an email'
               : 'no it is not an email'}
         </h2>
         <hr />
         <Counter />
         <hr />
         <p>
            <span>import in top file</span>
            <br />
            GIF <img src={Giphy} width={300} alt="" />
            JPG <img src={IMAGE} width={300} alt="" />
            SVG <img src={EYE} width={300} alt="" />
         </p>
         <hr />
         <p>
            <span>path in src attr GIF (inline import does not work)</span>
            <br />
            GIF <img src="./assets/img/giphy.gif" width={300} alt="" />
            JPG <img src="./assets/img/image.jpg" width={300} alt="" />
            SVG <img src="./assets/svg/eye.svg" width={300} alt="" />
            {/* <img src="./assets/img/image.jpg" width={300} alt="" /> */}
         </p>
         <hr />
         <div className="hero">Lorem ipsum dolor sit amet consectetur.</div>
      </>
   );
};

export default App;
