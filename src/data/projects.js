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
        "clouds",
        "lotp",
        "waking-nightmare",
        "anim-software",
        "apple-valley",
        "forest-scene",
        "mandelbrot",
        "picky-clients",
        "carbon-rapture",
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
            images = images.map((x) => x.substring(3));

            for (const [ind, img] of images.entries()) {
                image_data.push({
                    "src": img,
                })
            }
        }

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
}