export const convertDate = (date) => {
    return new Date(date).toLocaleString('en-EN', {
        month: "long",
        day  : "numeric",
        year : "numeric"
    });
};

export const truncateText = (text, limit) => {
    return text.length > limit+1 ? text.substring(0, limit) + "..." : text;
};