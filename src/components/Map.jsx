import Map_img from '../images/map.svg';

const Map = ({ lvl, xp }) => {
  return (
    <div className='map_container'>
      <img
        src={Map_img}
        alt='map'
        className='map_img'
        style={{ pointerEvents: 'none' }}
      />
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) rotate(30deg)',
          width: 'max-content',
          background: '#f00',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: 5,
          boxShadow: '0 0 10px 0px #000000',
          fontFamily: 'sans-serif',
          border: '5px dashed white',
          pointerEvents: 'none'
        }}
      >
        MAP IS IN DEVELOPMENT
      </span>
      <span className='lvl_txt'>
        lvl {lvl ? lvl : 0} / xp {xp ? xp : 0}
      </span>
      {/* <button className='special_unlock_btn'>Unlock Country</button> */}
    </div>
  );
};

export default Map;
