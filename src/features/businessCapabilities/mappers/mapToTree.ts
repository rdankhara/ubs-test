import {BusinessCapability, TreeNode} from "../state/businessCapabilityState";

const createNodes = (keys: string[]) => {
    const node = {} as TreeNode;
    keys.reduce((prev, current) => {

        if (!prev.key) {
            prev.key = current;
            prev.title = current;
            return prev;
        } else {
            const newNode = {key: current, title: current};
            prev.children = [newNode];
            return newNode;
        }
    }, node);

    return node;
}

export const transformToTree = (data: BusinessCapability[]) => {
    const transformed = data.reduce((accumulated, current) => {

        const level1Node: TreeNode | undefined = accumulated.find(x => x.key === current.bcap1);
        if (!level1Node) {
            const node: TreeNode = createNodes([current.bcap1, current.bcap2, current.bcap3]);
            accumulated.push(node);

        } else {

            const level2Node = level1Node.children?.find(x => x.key === current.bcap2);

            if (!level2Node) {
                level1Node.children?.push(createNodes([current.bcap2, current.bcap3]));
            }
            else {
                const level3Node = level2Node?.children?.find(x => x.key === current.bcap3);
                if (!level3Node) {
                    level2Node.children?.push({key: current.bcap3, title: current.bcap3});
                }
            }
        }

        return accumulated;
    }, [] as TreeNode[]);

    return transformed;
}