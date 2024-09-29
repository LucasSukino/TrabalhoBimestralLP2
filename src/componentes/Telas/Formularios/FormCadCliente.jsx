import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function FormCadClientes(props) {
    const [cliente,setCliente] = useState(props.clienteSelecionado);
    const [formValidado,setFormValidado] = useState(false);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                //cadastrar o produto
                props.setListaDeClientes([...props.listaDeClientes, cliente]);
                //exibir tabela com o produto incluído
                props.setExibirTabela(true);
            }
            else{
                props.setListaDeClientes(props.listaDeClientes.map((item) => {
                    if (item.codigo !== cliente.codigo)
                        return item
                    else
                        return cliente
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setClienteSelecionado({
                    codigo:0,
                    cpf:"",
                    nome:"",
                    email:"",
                    telefone:""
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
        setCliente({...cliente, [elemento]:valor});
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
                            value={cliente.codigo}
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
                        label="CPF:"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={cliente.cpf}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o CPF do cliente!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} md="8">
                    <FloatingLabel
                        label="Nome:"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            id="nome"
                            name="nome"
                            value={cliente.nome}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o nome do cliente!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="6">
                    <FloatingLabel
                        label="E-mail:"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={cliente.email}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o e-mail do cliente!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <FloatingLabel
                        label="Telefone:"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            id="telefone"
                            name="telefone"
                            value={cliente.telefone}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o telefone do cliente!
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