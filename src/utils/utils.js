export const capitalizeWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const recipiePlaceholderImage = () => {
    const images = [
        "https://design4users.com/wp-content/uploads/2023/03/food-illustration-helen-lee.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/food-illustration-by-helen-lee.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-2.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-3.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-4.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-5.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-6.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-7.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-8.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-9.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-10.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-11.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-12.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-13.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-14.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-15.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-16.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-17.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-18.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-19.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-20.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-21.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-22.jpg",
        "https://design4users.com/wp-content/uploads/2023/03/helen-lee-food-illustration-1320x990.jpg"
    ]
    
    return images[Math.floor(Math.random() * images.length)]
}