// const vDomExample = {
//     tag: "div",
//     props: {
//         class: "container"
//     },
//     children: [
//         {
//             tag: "h1",
//             props: {
//                 title: "This is title"
//             },
//             children: "Basics framework"
//         },
//         {
//             tag: "p",
//             props: {
//                 class: "desc",
//                 children: "We are learning "
//             }
//         }
//     ]
// }

//текст записывается не как textContent для ноды, а как отдельная нода с nodeValue
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
}

//под капотом к jsx применяется эта функция, где тип - тэг, пропсы - все атрибуты, а children - вложенные теги (rest'им их)
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === "object"
                    ? child
                    : createTextElement(child)
            ),
        },
    }
}

//для рендера
function render(node, container) {
    //создаем элемент (самый родительский)
    const dom = node.type === "TEXT_ELEMENT" ?
        document.createTextNode("") :
        document.createElement(node.type);

    console.log(dom)

    //добавляем DOM properties каждому
    Object.keys(node.props)
        .filter(prop => prop !== "children")
        .forEach(prop => {
            dom[prop] = node.props[prop]; //примерно как dom.setAttribute(prop, node.props[prop])
        })

    //тоже самое проделываем для каждого дочернего элемента, добавляя его в родительский
    node.props.children.forEach(child => {
        render(child, dom)
    })

    //в конце вставляем получившийся элемент в родителя
    container.appendChild(dom)
}

const NWReact = {
    createElement,
    render
}

/** @jsx NWReact.createElement */
const element = (
    <div id="foo">
        <h1 className={"123"} style="color:red">123</h1>
        <b />
    </div>
)

NWReact.render(element, document.getElementById("app"))