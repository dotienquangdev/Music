import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./overview.css"
import { loginUsers, loginUserDelete } from "../../services/user";
import { createSinger } from "../../services/singer";
import { createSong } from "../../services/song";
import { createTopic } from "../../services/topic";
import { deleteUser, deleteUserDelete } from "../../services/user";
import { deleteSong } from "../../services/song";
export default function Overview({ title }) {
    const [overview, setOverview] = useState([]);
    const [overviewSong, setOverviewSong] = useState([]);
    const [overviewDelete, setOverviewDelete] = useState([]);

    const [song, setSong] = useState([]);
    const [singer, setSinger] = useState([]);
    const [topic, setTopic] = useState([]);

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setOverview(prev => prev.filter(user => user._id !== id));
            alert("Xóa người dùng thành công.");
        } catch (error) {
            console.error("Xóa người dùng thất bại:", error);
            alert("Xóa người dùng thất bại.");
        }
    };
    const handleDeleteSong = async (id) => {
        try {
            await deleteSong(id);
            setOverviewSong(prev => prev.filter(song => song._id !== id));
            alert("Xóa bài hát thành công.");
        } catch (error) {
            console.error("Xóa bài hát thất bại:", error);
            alert("Xóa bài hát thất bại.");
        }
    };

    const handleDeleteAll = async (id) => {
        try {
            await deleteUserDelete(id);
            setOverviewDelete(prev => prev.filter(user => user._id !== id));
            alert("Khôi phục người dùng thành công.");

        } catch (error) {
            console.error("Khôi phục người dùng thất bại:", error);
            alert("Khôi phục người dùng thất bại.");
        }
    };

    useEffect(() => {
        const fetchOverview = async () => {
            const result = await loginUsers();
            setOverview(result.user); // tùy theo API trả về
            console.log("Số lượng user:", result.user.length);
        };
        const fetchOverviewDelete = async () => {
            const result = await loginUserDelete();
            setOverviewDelete(result.user); // tùy theo API trả về
            console.log("Số lượng user:", result.user.length);
        };


        const fetchSinger = async () => {
            const result = await createSinger();
            setSinger(result.singer);
            console.log("Số lượng singer:", result.singer.length);
        }
        const fetchSong = async () => {
            const result = await createSong();
            setSong(result.song);
            console.log("Số lượng song:", result.song.length);
        }
        const fetchTopic = async () => {
            const result = await createTopic();
            setTopic(result.topic);
            console.log("Số lượng topic:", result.topic.length);
        }
        fetchTopic();
        fetchSinger();
        fetchSong();
        fetchOverview();
        fetchOverviewDelete();
    }, []);


    console.log("Tài khoản: ", overview);
    console.log("Tài khoản: ", overviewDelete);

    return (
        <>
            <div className="overviewAll">
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <div className="overview-topic">
                    <p>Số lượng bài hát: {song.length}</p>
                    <p>Số lượng chủ đề: {topic.length}</p>
                    <p>Số lượng ca sỹ: {singer.length}</p>
                    <p>Số lượng tài khoản: {overview.length}</p>
                    <p>Số lượng tài khoản đã xóa: {overviewDelete.length}</p>
                </div>

                <div className="overviewSong">
                    <h2 className="overviewSong-text">Danh sách bài hát:  {song.length}</h2>
                    <ul className="overviewSong-item">
                        {song.length > 0 ? (
                            song.map(item => (
                                <li key={item._id} className="overviewSongItem-item">
                                    <img className="overviewSongItem-img" src={item.avatar} alt={item.title} />
                                    <span className="overviewSongItem-text">
                                        {item.title}
                                    </span>

                                    <span className="overviewSongItem-button">
                                        <button>Sửa</button>
                                        <button onClick={() => handleDeleteSong(item._id)}>Xóa</button>
                                    </span>
                                </li>
                            ))
                        ) : (
                            <div>Không có dữ liệu</div>
                        )}
                    </ul>
                </div>

                <div className="overview">
                    <h2 className="overviewh2">Danh sách tài khoản người dùng</h2>
                    <ul className="overviewText">
                        {overview.length > 0 ? (
                            overview.map(item => (
                                <li key={item._id} className="overview-item">
                                    <span>
                                        {item.fullName}
                                    </span>
                                    <span>
                                        {item.email}
                                    </span>
                                    <span>
                                        <button>Sửa</button>
                                        <button onClick={() => handleDelete(item._id)}>Xóa</button>
                                    </span>
                                </li>
                            ))
                        ) : (
                            <div>Không có dữ liệu</div>
                        )}
                    </ul>
                </div>
                <div className="overview">
                    <h2 className="overviewh2">Danh sách tài khoản người dùng đã xóa</h2>
                    <ul className="overviewText">
                        {overviewDelete.length > 0 ? (
                            overviewDelete.map(item => (
                                <li key={item._id} className="overview-item">
                                    <span>
                                        {item.fullName}
                                    </span>
                                    <span>
                                        {item.email}
                                    </span>
                                    <span>
                                        <button onClick={() => handleDeleteAll(item._id)}>Khôi phục</button>
                                    </span>
                                </li>
                            ))
                        ) : (
                            <div>Không có dữ liệu</div>
                        )}
                    </ul>
                </div>
            </div>

        </>
    );
}
