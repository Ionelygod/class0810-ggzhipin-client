import React,{Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
class Laoban extends Component{
    render(){
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                        <Card.Header
                          thumb={require('../../assets/images/avatars/头像1.png')}
                          extra={<span>dashen001</span>}
                        />
                        <Card.Body>
                            <div>职位：XXX</div>
                            <div>公司：XXX</div>
                            <div>月薪：XXX</div>
                            <div>描述：XXX</div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
            </div>
        )
    }
}
export default Laoban;