import axios from 'axios'

class ImageService {
    baseURL = 'http://localhost:8080/api/dodientu/v1/image';

    uploadImage(data) {
        return axios.post(
            this.baseURL,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    }

    // getImage(nameImg) {
    //     if (nameImg.indexOf("https://") !== -1) {
    //         return nameImg;
    //     } else
    //         return this.baseURL + '?urlFile=' + nameImg;
    // }

    getImage(nameImg) {
        return this.baseURL + '?urlFile=' + nameImg;
    }
}

export default new ImageService();