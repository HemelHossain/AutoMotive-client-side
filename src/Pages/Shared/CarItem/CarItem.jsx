import React  from 'react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const CarItem = ({item}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const {_id, make, model, price, image, description} = item;
    const {users} = useContext(AuthContext);
    
    const handleAddToCart= () =>{
        if(users && users.email){
            navigate(`/purchase/${_id}`);
        }
        else{
            navigate('/login', {state:{ from: location}});
        }
    }


    return (
        <div className="card w-80 h-[450px] bg-base-100 shadow-xl mx-auto">
            <figure><img className='object-cover' src={image} alt="Shoes" /></figure>
            <p className='absolute bg-black m-2 right-0  px-2 rounded text-white'>{price}</p>
            <div className="card-body px-5 ">
                <h2 className="card-title">{make} {model}</h2>
                <p>{description.length > 50 ? <span>{description.slice(0, 80)}</span>: <span>{description}</span> }</p>
                <button onClick={handleAddToCart}  className="btn btn-outline border-orange-300 bg-slate-200">Add to Cart</button>
            </div>
        </div>
    );
};

export default CarItem;