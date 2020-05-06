import React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from './utils';

// 每个单元选择
class TransformFuntions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, name: 1 },
                { id: 2, name: 2 },
                { id: 3, name: 3 },
                { id: 4, name: 4 },
                { id: 5, name: 5 },
                { id: 6, name: 6 },
            ]
        };
    }

    onDrop = newItems => this.setState({ items: applyDrag(this.state.items, newItems) })

    render = () => {
        return (<div className="transform-functions-container">
            <Container
                orientation="horizontal"
                onDrop={this.onDrop}>
                {
                    this.state.items.map(p => {
                        return (
                            <Draggable key={p.id}>
                                <div className="draggable-item-horizontal">
                                    {p.id}
                                </div>
                            </Draggable>
                        );
                    })
                }
            </Container>
        </div>)
    }

}

export default TransformFuntions;
