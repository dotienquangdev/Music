import { get, _get, _delete } from "../utils/requist";

export const createSong = async (data) => {
    const response = await _get(`/song`, data);
    const result = await response.json();
    return result;
}
export const createSongs = async () => {
    const result = await get(`song`);
    return result;
}

export const createSongId = async (id) => {
    const response = await _get(`/song/${id}`);
    const result = await response.json();
    return result;
}

export const createSongTopicId = async (topicId) => {
    const response = await _get(`/song?topicId=${topicId}`);
    const result = await response.json();
    return result;
};

const deleteSong = async (id) => {
    const response = await _delete(`/delete/${id}`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi ${response.status}: ${errorText}`);
    }
    return await response.json();
}

export { deleteSong };