import Map_img from '../images/map.svg';

const Map = ({ lvl, xp }) => {
  return (
    <div className='map_container'>
      <img src={Map_img} alt='map' className='map_img' />
      <span className='lvl_txt'>
        lvl {lvl ? lvl : 0} / xp {xp ? xp : 0}
      </span>
      {/* <button className='special_unlock_btn'>Unlock Country</button> */}
    </div>
  );
};

export default Map;
