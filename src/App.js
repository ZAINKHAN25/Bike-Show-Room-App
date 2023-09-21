import { useState } from 'react';
import './App.css';
import sportsBikes from './megadata.js'

function App() {
  // useState
  let [searchdata, setSearchData] = useState([]);

  let [currentshowingdiv, setcurrentshowingdiv] = useState();
  let [iscurrentshowingdivtrue, setiscurrentshowingdivtrue] = useState(false);
  let [addtolistarr, setaddtolistarr] = useState([]);
  let [hoverquantity, sethoverquantity] = useState();
  let [isaddbtntrue, setisaddbtntrue] = useState(false);

  let [textofinput, settextofinput] = useState()

  const tentimesloop = [25, 25, 25, 25, 25, 25, 25, 25, 25, 25];

  // Function to calculate the average price of bikes in addtolistarr
  const calculateAveragePrice = () => {
    if (addtolistarr.length === 0) {
      return "0";
    }

    let total = 0;
    addtolistarr.forEach((item) => {
      // Assuming the price is in the format "5000$"
      const price = parseFloat(item.price.replace("$", ""));
      total += price;
    });

    const average = total / addtolistarr.length;
    return `$${average.toFixed(2)}`;
  };

  const calculateAverageStars = () => {
    if (addtolistarr.length === 0) {
      return "0";
    }

    let total = 0;
    addtolistarr.forEach((item) => {
      // Assuming the price is in the format "5000$"
      const price = parseFloat(item.stared);
      total += price;
    });

    const average = total / addtolistarr.length;
    return `${average.toFixed(2)}`;
  };

  function searchdatafoo() {
    if (textofinput === '') {
      setSearchData(sportsBikes)
    }
    else {

      const filteredBikes = sportsBikes.filter((bike) =>
        bike.name && bike.name?.toLowerCase().includes(textofinput?.toLowerCase())
      );
      setSearchData(filteredBikes);
    }
  }



  return (
    <div className="body">
      {/* navbar */}

      <div className='px-1 flex-wrap py-2 d-flex align-items-center navbar-zk'>
        <div onClick={() => setiscurrentshowingdivtrue(false)} className="fw-800 fs-2 fw-9 my-1 logoofnavbar">Biker Time</div>
        <div className="d-flex my-1" role="search">
          <input
            value={textofinput}
            onChange={(e) => {
              settextofinput(e.target.value);
              searchdatafoo(); // Call the searchdatafoo function on input change
            }}
            className="form-control me-2 inputofnavbar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />

        </div>
        <div className='my-1'>Found {searchdata.length} top result</div>
      </div>

      {/* section area */}
      <div className='d-flex justify-content-center align-items-stretch flex-wrap py-1'>
        <div className='searchedDiv my-2 mx-1 p-3 d-flex flex-column justify-content-start align-items-start'>
          {searchdata.map((singledata, i) => (
            <Singledatadiv
              key={i}
              singledata={singledata}
              i={i}
              setcurrentshowingdiv={setcurrentshowingdiv}
              setiscurrentshowingdivtrue={setiscurrentshowingdivtrue}
              setSearchData={setSearchData}
            />
          ))}
        </div>

        <div className='searchedDiv my-2 mx-1 p-3 d-flex flex-column justify-content-between align-items-center'>
          {iscurrentshowingdivtrue === false ? (
            <div>
              <h3>Bikes You Stared</h3>
              <div>
                <span className='mx-1'>{addtolistarr.length} Bikes </span>
                <span className='mx-1'>{calculateAveragePrice()} Price  </span>
                <span className='mx-1'>{calculateAverageStars()} Stars  </span>
              </div>
              <div className='pt-3'>


                {addtolistarr.map((item, index) => (
                  <div className='d-flex align-items-center flex-wrap justify-content-start my-2 widtharea' key={index}>
                    <img className='imgofselected me-3 my-2' src={item.imgUrl} />
                    <div>
                      <div>
                        {item.name}
                      </div>
                      <div>
                        <span>{item.price}</span>
                        <span className='startcolor m-2'><i className='fa-star fa-solid startcolor'></i> {item.stared}</span>
                      </div>
                    </div>
                    <div onClick={() => {
                      item.isStaredTrue = false;
                      const copyofaddtolistarr = [...addtolistarr];
                      copyofaddtolistarr.splice(index, 1); // Remove the item from the array
                      setaddtolistarr(copyofaddtolistarr);
                    }}>
                      <i class="fa-solid m-2 fs-4 fa-x" style={{ color: "#ff0000" }}></i>
                    </div>

                  </div>
                ))}
                <button className='addToCartbtn rounded-5 py-2 px-3' onClick={() => setSearchData(sportsBikes)}>Search All Bikes</button>
              </div>
            </div>
          ) : searchdata[currentshowingdiv].isStaredTrue === false ? (
            <div>
              <img className='imgofmainframe mb-2' src={searchdata[currentshowingdiv].imgUrl} alt="" />
              <div>
                <h5>{searchdata[currentshowingdiv].name}</h5>
                <p>{searchdata[currentshowingdiv].year}</p>
              </div>
              <div className='mx-auto text-center'>
                {tentimesloop.map((item, index) => (
                  <i
                    key={index}
                    onMouseOver={() => {
                      setSearchData(prevData => {
                        const newData = [...prevData];
                        newData[currentshowingdiv].hoverstared = index + 1;
                        return newData;
                      });
                    }}
                    onClick={() => {
                      setisaddbtntrue([true, searchdata[currentshowingdiv]]);
                      sethoverquantity(index + 1);

                      setSearchData(prevData => {
                        const newData = [...prevData];
                        newData[currentshowingdiv].stared = index + 1;
                        return newData;
                      });
                    }}
                    className={`fa-star startcolor ${index < searchdata[currentshowingdiv].stared ? 'fa-solid' : 'fa-regular'} ${index < searchdata[currentshowingdiv].hoverstared ? 'fa-solid' : ''}`}
                  ></i>
                ))}{' '}
                <span className='startcolor ms-2'>{searchdata[currentshowingdiv].stared || ''}</span>
                {isaddbtntrue[0] === true ? (
                  <div className='mt-3'>
                    <button
                      className='addToCartbtn rounded-5 py-2 px-3'
                      onClick={() => {
                        setaddtolistarr(prevList => [...prevList, isaddbtntrue[1]]);
                        setiscurrentshowingdivtrue(false);
                        setSearchData(prevData => {
                          const newData = [...prevData];
                          newData[currentshowingdiv].isStaredTrue = true;
                          return newData;
                        });
                      }}
                    >
                      + Add To Cart
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className='mt-3'>
                {searchdata[currentshowingdiv].description}
              </div>
            </div>
          ) : (
            <div>
              <img className='imgofmainframe mb-2' src={searchdata[currentshowingdiv].imgUrl} alt="" />
              <div>
                <h5>{searchdata[currentshowingdiv].name}</h5>
                <p>{searchdata[currentshowingdiv].year}</p>
              </div>
              <div className='mt-3'>
                You have stared this bike <span className='startcolor'>{searchdata[currentshowingdiv].stared}</span>
              </div>
              <button className='addToCartbtn rounded-5 py-2 px-3' onClick={() => setSearchData(sportsBikes)}>Search All Bikes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Singledatadiv({ singledata, i, setcurrentshowingdiv, setiscurrentshowingdivtrue, setSearchData }) {
  return (
    <div
      className='my-2 d-flex'
      onClick={() => {
        setcurrentshowingdiv(i);
        setiscurrentshowingdivtrue(true);
      }}
    >
      <img className='imgofsearchdata me-3' src={singledata.imgUrl} alt="" />
      <div className='d-flex flex-column'>
        <span>{singledata.name}</span>
        <span>{singledata.price}</span>
      </div>
    </div>
  );
}

export default App;
