import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function FormCadUsuarios(props) {
    const [usuario,setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado,setFormValidado] = useState(false);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                //cadastrar o produto
                props.setListaDeUsuarios([...props.listaDeUsuarios, usuario]);
                //exibir tabela com o produto incluído
                props.setExibirTabela(true);
            }
            else{
                props.setListaDeUsuarios(props.listaDeUsuarios.map((item) => {
                    if (item.codigo !== usuario.codigo)
                        return item
                    else
                        return usuario
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                    codigo:0,
                    username:"",
                    email:"",
                });
                props.setExibirTabela(true);
            }
        }
        else{
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento){
        const elemento = evento.target.name;
        const valor    = evento.target.value; 
        setUsuario({...usuario, [elemento]:valor});
    }


    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <FloatingLabel
                        label="Código:"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            id="codigo"
                            name="codigo"
                            value={usuario.codigo}
                            disabled={props.modoEdicao}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o código do cliente!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <FloatingLabel
                        label="USERNAME:"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            id="username"
                            name="username"
                            value={usuario.username}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o Username do usuario!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} md="8">
                    <FloatingLabel
                        label="Email:"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            id="email"
                            name="email"
                            value={usuario.email}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o email do usuario!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mt-2 mb-2">
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>
    );
}