import React, { useRef, useEffect } from "react";
import s from "./Home.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { photosActions } from "../../reducers/photosReducer";
import Button from "../../components/Button/Button";
import { userActions } from "../../reducers/usersReducer";
import { useHistory } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const photos = useSelector((state) => state.photos);
  const loading = photos.loading;
  const getPhotos = (delay = 1000) => {
    let timer = setTimeout(() => {
      axios.get(`${photos.fetchPhotos}?_page=0&_limit=10`).then((res) => {
        dispatch(photosActions.addPhotos(res.data));
        dispatch(photosActions.setLoadingPhotos(false));
      });
      clearTimeout(timer);
    }, delay);
  };
  useEffect(() => {
    dispatch(photosActions.setLoadingPhotos(true));
    getPhotos(0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!loading) return;
    getPhotos();
  }, [loading]);
  const onLogout = () => {
    dispatch(userActions.addUserDetails(null));
    history.push("/login");
  };
  function handleScroll() {
    if (
      Math.round(window.innerHeight + document.documentElement.scrollTop) <
      document.documentElement.offsetHeight
    ) {
      return;
    }
    dispatch(photosActions.setLoadingPhotos(true));
  }
  const loadingCSS = {
    height: "100px",
    margin: "30px",
  };
  return (
    <div className={s.container}>
      <div className={s.logoutContainer}>
        <Button type={"button"} onClick={onLogout}>
          Logout
        </Button>
      </div>
      <div className={s.imgHolder}>
        {photos.photosList.map((user, index) => (
          <div
            key={user.url + index}
            className={s.imgContactContainer}
            id={index + "photo"}
          >
            <div className={s.imgContainer}>
              <img src={user.url} alt={user.title} />
            </div>
            <div className={s.contactDetails}>{user.title}</div>
          </div>
        ))}
        {loading && (
          <div
            className={`${s.imgContactContainer} ${s.controlsLoader}`}
            style={{
              height: document.getElementById("0photo")
                ? document.getElementById("0photo").offsetHeight
                : "auto",
            }}
          >
            <div className={s.centerPositionText}>Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
