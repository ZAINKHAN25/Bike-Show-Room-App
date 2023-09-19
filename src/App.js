import { useState } from 'react';
import './App.css';

function App() {
  // use State
  let [searchdata, setsearchdata] = useState([
    {
      imgUrl: 'https://avatars.githubusercontent.com/u/121414309?v=4',
      heading: 'Zain Khan 25',
      year: 2012
    },
    {
      imgUrl: 'https://avatars.githubusercontent.com/u/122217933?v=4',
      heading: 'Huzaifa Khan Official',
      year: 2025
    }

  ]);

  let [currentshowingdiv, setcurrentshowingdiv] = useState();
  let [addtolistarr, setaddtolistarr] = useState([]);
  let [hoverquantity, sethoverquantity] = useState();
  let [mouseoverquantity, setmouseoverquantity] = useState();
  let [isaddbtntrue, setisaddbtntrue] = useState(false);




  const tentimesloop = [25, 25, 25, 25, 25, 25, 25, 25, 25, 25]




  return (
    <div className="body">
      {/* navbar */}
      <nav class="navbar navbar-zk navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse classofdivofnavbar" id="navbarSupportedContent">

            <div class="fw-800 fs-4">ShowOff </div>

            <div class="d-flex" role="search">
              <input class="form-control me-2 inputofnavbar" type="search" placeholder="Search" aria-label="Search" />
            </div>

            <div>
              Found 0 top result
            </div>

          </div>
        </div>
      </nav>

      {/* section area */}
      <div className='d-flex justify-content-center align-itmes-center flex-wrap py-1'>

        <div className='searchedDiv my-2 mx-1 p-3 d-flex flex-column justify-content-start align-itmes-center'>
          {searchdata.map((singledata, i) =>
            <Singledatadiv setcurrentshowingdiv={setcurrentshowingdiv} singledata={singledata} i={i} />
          )}
        </div>

        <div className='searchedDiv my-2 mx-1 p-3 d-flex flex-column justify-content-start align-itmes-center'>
          {

            currentshowingdiv === undefined ? (
              <div>
                <h3>MOVIES YOU WATCHED</h3>
                {isaddbtntrue[1]}
              </div>

            ) : (
              <div>
                <img className='imgofmainframe mb-2' src={searchdata[currentshowingdiv].imgUrl} alt="" />
                <div>
                  <h5>{searchdata[currentshowingdiv].heading}</h5>
                  <p>{searchdata[currentshowingdiv].year}</p>
                </div>
                <div className='mx-auto text-center'>
                  {
                    tentimesloop.map((item, index) => (
                      <i onMouseOver={() => {
                        setmouseoverquantity(index + 1)
                      }} onClick={() => {
                        setisaddbtntrue([true, index])
                        sethoverquantity(index + 1)
                      }} class={`fa-star startcolor ${index < hoverquantity ? 'fa-solid' : 'fa-regular'} ${index < mouseoverquantity ? 'fa-solid' : ''}`}></i>
                    ))

                  } {(
                    <span className='startcolor ms-2'>
                      {hoverquantity}
                    </span>
                  ) ?? ''
                  }

                  {
                    isaddbtntrue[0] === true ? (
                      <div className='mt-3'>
                        <button className='addToCartbtn rounded-5 py-2 px-3' onClick={() => {
                          var copyofaddlist = addtolistarr || [];
                          var adddingcurrentindex = copyofaddlist.push(isaddbtntrue[1]);

                          setaddtolistarr(adddingcurrentindex);

                        }}>+ Add To cart</button>
                      </div>
                    ) : ''
                  }

                </div>
              </div>
            )
          }
        </div>

      </div>


    </div>
  );
}

function Singledatadiv({ singledata, i, setcurrentshowingdiv }) {
  return (
    <div className='my-2 d-flex' onClick={() => {
      setcurrentshowingdiv(i);
    }}>

      <img className='imgofsearchdata me-3' src={singledata.imgUrl} />
      <div className='d-flex flex-column'>
        <span>{singledata.heading}</span>
        <span>{singledata.year}</span>
      </div>

    </div>
  )
}



export default App;