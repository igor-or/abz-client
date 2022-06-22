const getImageDimensions = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const img = new Image();
                img.src = reader.result;
                img.onload = async function () {
                    resolve({
                        width: this.width,
                        height: this.height,
                    });
                };
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = error => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};

export const validate = {
    name(name) {
        return name.length >= 2 && name.length <= 60;
    },
    email(email) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
            email
        );
    },
    phone(phone) {
        return /^[\+]{0,1}380([0-9]{9})$/.test(phone);
    },
    async photo(file) {
        if (!file) {
            return {
                isValid: false,
                errorText: 'Photo not provided.',
            };
        }

        if (!(file.type === 'image/jpg' || file.type === 'image/jpeg')) {
            return {
                isValid: false,
                errorText: 'Image is invalid.',
            };
        }

        let filesize = (file.size / 1024 / 1024).toFixed(4);
        if (filesize > 5) {
            return {
                isValid: false,
                errorText: 'The photo may not be greater than 5 Mbytes.',
            };
        }

        const imageDimensions = await getImageDimensions(file);
        if (imageDimensions.width < 70 || imageDimensions.height < 70) {
            return {
                isValid: false,
                errorText: 'The photo must be at least 70px width and height.',
            };
        }

        return { isValid: true, errorText: '' };
    },
};
