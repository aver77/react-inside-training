const MyReact = (function() {

    let hooks = [];
    let hooksCount = 0;
    const useState = (initialValue) => {
        const currentIndex = hooksCount;

        const state = hooks[currentIndex] || initialValue;

        const setState = (newValue) => {
            hooks[currentIndex] = newValue;
        }

        hooksCount++;

        return [state, setState]
    }

    const useEffect = (cb, depArray) => {
        const currentIndex = hooksCount;
        const oldDeps = hooks[currentIndex];

        let hasChanged = true;

        if (oldDeps) {
            hasChanged = depArray.some((dep, i) => {
                return Object.is(dep, oldDeps[i])
            })
        }

        if (hasChanged) {
            cb();
        }

        hooks[currentIndex] = depArray;
        hooksCount++;
    }

    const render = (Component) => {
        hooksCount = 0;

        const C = Component();
        C.render();
        return C;
    }

    return {
        useState,
        useEffect,
        render
    }
})()

const MyComponent = () => {
    const [count, setCount] = MyReact.useState(0);
    const [text, setText] = MyReact.useState("hi");

    MyReact.useEffect(() => {
        console.log("EFFECT");
    }, [])

    return {
        setCount: (v) => setCount(v),
        setText: (t) => setText(t),
        render: () => console.log(`count: ${count}, text: ${text}`)
    }
}

let App = MyReact.render(MyComponent);
App.setCount(55);
App = MyReact.render(MyComponent);
App.setText("Nikita");
App = MyReact.render(MyComponent);
App.setCount(123);
App = MyReact.render(MyComponent);