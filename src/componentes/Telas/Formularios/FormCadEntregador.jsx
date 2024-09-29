import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function FormCadEntregadores(props) {
    const [entregador, setEntregador] = useState(props.entregadorSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                // Cadastrar o entregador
                props.setListaDeEntregadores([...props.listaDeEntregadores, entregador]);
                // Exibir tabela com o entregador incluído
                props.setExibirTabela(true);
            } else {
                props.setListaDeEntregadores(props.listaDeEntregadores.map((item) => {
                    if (item.codigo !== entregador.codigo)
                        return item;
                    else
                        return entregador;
                }));
                
                // Voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setEntregadorSelecionado({
                    codigo: 0,
                    cpf: "",
                    nome: "",
                    telefone: "",
                    veiculo: "",
                    placa: "",
                    cnh: ""
                });
                props.setExibirTabela(true);
            }
        } else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setEntregador({ ...entregador, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <FloatingLabel label="Código:" className="mb-3">
                        <Form.Control
                            required
                            type="text"
                            id="codigo"
                            name="codigo"
                            value={entregador.codigo}
                            disabled={props.modoEdicao}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o código do entregador!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <FloatingLabel label="CPF:" className="mb-3">
                        <Form.Control
                            required
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={entregador.cpf}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o CPF do entregador!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} md="8">
                    <FloatingLabel label="Nome:" className="mb-3">
                        <Form.Control
                            required
                            type="text"
                            id="nome"
                            name="nome"
                            value={entregador.nome}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o nome do entregador!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="6">
                    <FloatingLabel label="Telefone:" className="mb-3">
                        <Form.Control
                            required
                            type="text"
                            id="telefone"
                            name="telefone"
                            value={entregador.telefone}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o telefone do entregador!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <FloatingLabel label="Veículo:" className="mb-3">
                        <Form.Control
                            required
                            type="text"
                            id="veiculo"
                            name="veiculo"
                            value={entregador.veiculo}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o tipo de veículo!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="6">
                    <FloatingLabel label="Placa do Veículo:" className="mb-3">
                        <Form.Control
                            required
                            type="text"
                            id="placa"
                            name="placa"
                            value={entregador.placa}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe a placa do veículo!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <FloatingLabel label="CNH:" className="mb-3">
                        <Form.Control
                            required
                            type="text"
                            id="cnh"
                            name="cnh"
                            value={entregador.cnh}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe a CNH do entregador!
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
