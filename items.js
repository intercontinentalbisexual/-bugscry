

const posts = []

const images = [
'./img-tattoo/1.jpg',
'./img-tattoo/2.jpg',
'./img-tattoo/3.jpg',
'./img-tattoo/4.jpg',
'./img-tattoo/5.jpg',
'./img-tattoo/6.jpg',
'./img-tattoo/7.jpg',
'./img-tattoo/8.jpg',
'./img-tattoo/9.jpg',
'./img-tattoo/10.jpg',
'./img-tattoo/11.jpg',
'./img-tattoo/12.jpg',
'./img-tattoo/13.jpg',
'./img-tattoo/14.jpg',
'./img-tattoo/15.jpg',
'./img-tattoo/16.jpg',
'./img-tattoo/17.jpg',
'./img-tattoo/18.jpg',
'./img-tattoo/19.jpg',
'./img-tattoo/20.jpg',
'./img-tattoo/21.jpg',
'./img-tattoo/22.jpg',
'./img-tattoo/23.jpg',
'./img-tattoo/24.jpg',
'./img-tattoo/25.jpg',
'./img-tattoo/26.jpg',
'./img-tattoo/27.jpg',
'./img-tattoo/28.jpg',
'./img-tattoo/29.jpg',
'./img-tattoo/30.jpg',
'./img-tattoo/31.jpg',
'./img-tattoo/32.jpg',
'./img-tattoo/33.jpg',
'./img-tattoo/34.jpg',
]

images.forEach((image, index) => {
    posts.push({
        id: index + 1,
        title: `Post ${index + 1}`,
        date: `${index + 1 < 10 ? 0 : ''}${index + 1}/10/2021 `,
        image
    });
});

console.log(posts)