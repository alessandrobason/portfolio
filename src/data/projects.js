const fs = require("fs");
const matter = require('gray-matter');
const glob_lib = require("glob");
const { execSync  } = require("child_process");

function glob(path) {
    return glob_lib.globSync(path, { posix: true });
}

function exec(command) {
    return execSync(command).toString().trimEnd();
}

module.exports = () => {
    const projs = [];
    const order = [
        "beyond-triangles",
        "erosion",
        "bomberman",
        "lotp",
        "apple-valley",
        "waking-nightmare",
        "anim-software",
        "forest-scene",
        "mandelbrot",
        "carbon-rapture",
        "picky-clients",
        "loopy-trajectory",
        "pacillus"
    ];

    for (const [i, o] of order.entries()) {
        const item = matter(fs.readFileSync(`src/projects/${o}.md`));
        const proj = item.data;
        const path = `src/assets/projects/${proj.dir}`;

        let image_data = [];

        let images = glob(`${path}/images/*.*`);
        if (images.length > 0) {
            const cmd = `aspect-ratio ${images.join(" ")}`;
            const aspect_ratio = exec(cmd).split("\n");

            images = images.map((x) => x.substring(3));

            for (const [ind, img] of images.entries()) {
                image_data.push({
                    "src": img,
                    "ratio": aspect_ratio[ind].trim()
                })
            }
        }

        // console.log();

        // for (const image of images) {
        //     // console.log(image);
        //     const aspect_ratio = exec(`aspect-ratio ${image}`);
        // }

        // images = images.map((x) => x.substring(3));

        projs.push({
            "title": proj.title,
            "width": proj.width,
            "dir": proj.dir,
            "colour": proj.colour,
            "image": proj.image,
            "id": order[i],
            "github": proj.download,
            "itch": proj.source,
            "images": image_data,
        });
    }

/*
    let pages = []
    for (const o of order) {
        pages.push(`src/projects/${o}.md`)
    }

    for (const [i, p] of pages.entries()) {
        const item = matter(fs.readFileSync(p));
        const proj = item.data;

        projs.push({
            "title": proj.title,
            "width": proj.width,
            "dir": proj.dir,
            "colour": proj.colour,
            "image": proj.image,
            "id": order[i],
            "github": proj.download,
            "itch": proj.source
        });
    }
*/
    return {
        items() {
            return projs;
        },
        
        getProject(title) {
            for (const p of projs) {
                if (p.title === title) {
                    return p;
                }
            }
            return null;
        }
    }
    return projs;
}