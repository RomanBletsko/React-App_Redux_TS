import { useAppSelector } from "../../../../store";


interface handleSelect{
  handleSelect:(addres:string)=>void
}
const Places:React.FC<handleSelect>=({handleSelect})=>{
  const {  location, loading} = useAppSelector(
      (store) => store.contacts
    );
    const handlePlace = (event:any)=>{
      const data = event.target.dataset
      const address = `${data.city} ${data.address}`
      handleSelect(address)
    }
  
  
 
  return <div>
    <ul className='flex justify-start gap-2.5 m-1 p-0'>
      {loading? null : 
      <>
        {location.map((el, index)=>{
          return <li key={el[0] + index}>
            <button className='border-0 rounded-sm px-2 py-0 bg-gray-100 text-gray-900 hover:bg-orange-500 ' 
            onClick={handlePlace} 
            data-city={el[0]} 
            data-address={el[1]}>{el[0]}</button>
            </li>
        })
        }
      </>}
    </ul>

  </div>  
}

// const CityList = styled.ul({
//   listStyle: "none",
//   display: "flex",
//   justifyContent: "start",
//   gap: "10px",
//   padding: 0
// })
// const Btn = styled.button`
//   font-weight: 800;
//   border-radius: 2px;
//   border: none;
//   padding: 3px 6px;
//   &:hover {
//     background: #ff6b0b;
//   }
// `;
export default Places