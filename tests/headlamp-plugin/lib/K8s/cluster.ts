export const makeKubeObject = () => {
    return class {
        static useList()  {
            throw new Error("Use mock instead!")
        }
    }
}