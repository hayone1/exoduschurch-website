import type { Node } from "@vue-flow/core";
import type { IParallaxFlow } from "~/types";

export const useParallaxFlows = () => {
    
    const viewport = useViewport();
    const colorMode = useColorMode();
    return [
        {
            // focusNodes: ['node-1a','node-2', 'node-3','node-ia'],
            title: "GIVE",
            visibilityNodesGroup: [
                ['node-1a', 'node-1'],
                ['node-2a','node-2'],
                ['node-3a','node-3'],
                ['node-ia','node-i'],
            ],
            backGroundColor: computed(() => colorMode.value === 'light' ? {
                parentBackground: "",
                patternBackground: "#1B1C1E"
            } : {
                parentBackground: "bg-black",
                patternBackground: ""
            }),
            nodes: (width: number, height: number) => [
                {
                    id: 'node-ia',
                    position: {
                        x: viewport.isGreaterThan('mobileMedium') ?
                            width / 1.6 : width / 2.4,
                        y: height / 12
                    },
                    type: 'output',
                    width: '12rem',
                    data: { label: 'Paypal' },
                    class: 'node-1',
                },
                {
                    id: 'node-i',
                    color: '#ff00ff',
                    position: {
                        x: viewport.isGreaterThan('mobileMedium') ?
                            width / 1.6 : width / 2.4,
                        y: (height / 12) + 45
                    },
                    type: 'input',
                    width: '12rem',
                    data: { label: 'paypal.me/myexoduschurch' }
                },
                {
                    id: 'node-1a',
                    position: { x: (width / 12) - 20, y: height / 12 },
                    type: 'output',
                    width: '8rem',
                    data: { label: 'Account No' }
                },
                {
                    id: 'node-1',
                    color: '#ff00ff',
                    position: { x: (width / 12) - 20, y: (height / 12) + 45 },
                    type: 'input',
                    width: '8rem',
                    data: { label: '3883006315' }
                },
                {
                    id: 'node-2a',
                    position: {
                        x: viewport.isGreaterThan('mobile') ?
                            width / 2.4 : width / 4,
                        y: height / 2.5
                    },
                    type: 'default',
                    data: { label: 'BANK' }
                },
                {
                    id: 'node-2',
                    color: '#ff00ff',
                    position: {
                        x: viewport.isGreaterThan('mobile') ?
                            width / 2.4 : width / 4,
                        y: (height / 2.5) + 45
                    },
                    type: 'default ',
                    data: { label: 'ECOBANK' }
                },
                {
                    id: 'node-3a',
                    position: {
                        x: viewport.isGreaterThan('mobileMedium') ?
                            width / 1.6 : width / 2.4,
                        y: height / 1.4
                    },
                    type: 'output',
                    data: { label: 'Account Name' }
                },
                {
                    id: 'node-3',
                    color: '#ff00ff',
                    position: {
                        x: viewport.isGreaterThan('mobileMedium') ?
                            width / 1.6 : width / 2.4,
                        y: (height / 1.4) + 45
                    },
                    type: 'input',
                    data: { label: 'Isibor Eseosa Valerie' }
                },
            ].map(node => ({
                ...node,
                style: {
                    backgroundColor: colorMode.value === 'light' ? "" : '#1B1C1E',
                    color: colorMode.value === 'light' ? "" : 'white',
                    borderRadius: '20px'
                },
            })) as Node[],

            edges: reactive([
                'node-1->node-2a',
                'node-2a->node-2',
                'node-2->node-3a'
            ].map(edgeId => ({
                id: edgeId,
                source: edgeId.split('->').at(0) ?? "",
                target: edgeId.split('->').at(-1) ?? "",
                style: {
                    stroke: computed(() => 
                        colorMode.value === 'light' ? '#1B1C1E' : ""
                    )
                },
            })))
        },
    ] as IParallaxFlow[]
}