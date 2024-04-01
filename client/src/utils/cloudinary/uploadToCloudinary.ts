export const uploadToCloudinary = async (formData: FormData, type: string) => {
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PUBLIC_CLOUDINARY_NAME}/${type}/upload`,
        {
            method: "POST",
            body: formData,
        }
    );
    const data = await response.json();
    return data.secure_url;
}