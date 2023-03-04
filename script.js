const image_settings = document.querySelector(".image-settings");
const image_settings_elements = getSettingsElements(image_settings);

const shape_settings = document.querySelector(".shape-settings");
const shape_settings_elements = getSettingsElements(shape_settings);

switchBackgroundType(image_settings_elements, shape_settings_elements)
switchBackgroundType(shape_settings_elements, image_settings_elements)

function getSettingsElements(setting_parent) {
    const elements = {
        head: setting_parent.querySelector(".head"),
        options: {
            dir: setting_parent.querySelector(".options > div"),
            mods: setting_parent.querySelectorAll(".mods > section"),
            properties: setting_parent.querySelectorAll(".properties > div > input")
        }
    }
    return elements
}

function switchBackgroundType(open) {
    open.head.addEventListener("click", () => {
        switch (getComputedStyle(open.options.dir).display) {
            case "none":
                open.options.dir.style = "display: flex;"
                break
            case "flex":
                open.options.dir.style = "display: none;"
                break
        }
    })
}

const text_settings = document.querySelector(".text-settings")
const text_settings_elements = getSettingsElements(text_settings)

const display = document.querySelector(".display")
const display_preview = {
    image: display.querySelector(".preview > img"),
    shape: display.querySelector(".preview > div"),
    text: display.querySelector(".preview > p")
}

const image_settings_values = sortSliderInputs(image_settings_elements.options.mods);
const shape_settings_values = sortSliderInputs(shape_settings_elements.options.mods);
const text_settings_values = sortSliderInputs(text_settings_elements.options.mods);

function sortSliderInputs(setting_list) {
    const setting_values = {}

    for (let i = 0; i < setting_list[0].children.length; i++) {
        setting_values[setting_list[0].children[i].id] = {
            name: setting_list[0].children[i],
            slider: setting_list[1].children[i],
            input: setting_list[2].children[i]
        }
    }

    return setting_values
}

[
    ...image_settings_elements.options.properties,
    ...shape_settings_elements.options.properties,
    ...text_settings_elements.options.properties
].forEach((e) => {
    e.addEventListener("input", () => {
        switch (e.id) {
            case "image_url":
                display_preview["image"].setAttribute("src", e.value)
                break
            case "shape_color":
                display_preview["shape"].style.background = `#${e.value}`
                break
            case "text_content":
                display_preview["text"].textContent = e.value
                break
            case "text_color":
                display_preview["text"].style.color = `#${e.value}`
                break
            case "text_size":
                display_preview["text"].style.fontSize = `${e.value}px`
                break
            case "text_font":
                console.log("Not Implemented")
                break
            case "text_weight":
                console.log("Not Implemented");
                break
        }
    })
})

let setting_to = [];

[
    ...Object.values(image_settings_values),
    ...Object.values(shape_settings_values),
    ...Object.values(text_settings_values)
].forEach((e, i) => {
    if (e.slider.closest(".image-settings")) {
        setting_to.push("image")
    }
    if (e.slider.closest(".shape-settings")) {
        setting_to.push("shape")
    }
    if (e.slider.closest(".text-settings")) {
        setting_to.push("text")
    }

    e.slider.addEventListener("input", () => {
        e.input.value = e.slider.value
        updatePreview(e, e.slider.value, setting_to[i])
    })

    e.input.addEventListener("input", () => {
        e.slider.value = e.input.value
        if (e.input.value === "" || e.input.value < parseInt(e.slider.min)) {
            e.slider.value = 0
            e.input.value = 0
        } else if (e.input.value > parseInt(e.slider.max)) {
            e.slider.value = e.slider.max
            e.input.value = e.slider.max
        }
        updatePreview(e, e.slider.value, setting_to[i])
    })
})

function updatePreview(e, value, setting_to) {
    const transform_now = ["translate(-50%, -50%)"]

    switch (setting_to) {
        case "image":
            transform_now[1] = `scale(${image_settings_values.scale.slider.value}%)`
            transform_now[2] = `rotate(${image_settings_values.rotation.slider.value}deg)`
            transform_now[3] = `skew(${image_settings_values.skew.slider.value}deg)`
            break;
        case "shape":
            transform_now[1] = `scale(${shape_settings_values.scale.slider.value}%)`
            transform_now[2] = `rotate(${shape_settings_values.rotation.slider.value}deg)`
            transform_now[3] = `skew(${shape_settings_values.skew.slider.value}deg)`
            break;
        case "text":
            transform_now[1] = `scale(${text_settings_values.scale.slider.value}%)`
            transform_now[2] = `rotate(${text_settings_values.rotation.slider.value}deg)`
            transform_now[3] = `skew(${text_settings_values.skew.slider.value}deg)`
            break;
    }

    switch (e.name.id) {
        case "x":
            display_preview[setting_to].style.left = `${value}%`
            break
        case "y":
            display_preview[setting_to].style.top = `${value}%`
            break
        case "width":
            display_preview[setting_to].style.width = `${value}px`
            break
        case "height":
            display_preview[setting_to].style.height = `${value}px`
            break
        case "scale":
            display_preview[setting_to].style.transform = transform_now.join(" ")
            break
        case "rotation":
            display_preview[setting_to].style.transform = transform_now.join(" ")
            break
        case "skew":
            display_preview[setting_to].style.transform = transform_now.join(" ")
            break
        case "radius":
            display_preview[setting_to].style.borderRadius = `${value}px`
            break
        case "opacity":
            display_preview[setting_to].style.opacity = `${value}%`
            break
    }
}

document.querySelector("#transform_top").textContent = "Top: " + (window.innerHeight - parseInt(getComputedStyle(display.querySelector(".preview")).height))
document.querySelector("#transform_left").textContent = "Left: " + (window.innerWidth - parseInt(getComputedStyle(display.querySelector(".preview")).width))


const tabs = display.querySelectorAll(".general > h1 > button")
const tabs_contents = display.querySelectorAll(".general > div")

tabs.forEach((e, i) => {
    e.addEventListener("click", () => {
        display.querySelector(".general > h1 > .active").classList.remove("active")
        e.classList.add("active")
        tabs_contents.forEach((el) => {
            el.style.display = "none"
        })
        tabs_contents[i].style.display = "flex"
    })
})