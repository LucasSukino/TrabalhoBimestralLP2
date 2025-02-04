import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function FormCadCategorias(props) {
    const [categoria,setCategoria] = useState(props.categoriaSelecionada);
    const [formValidado,setFormValidado] = useState(false);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                //cadastrar o produto
                props.setListaDeCategorias([...props.listaDeCategorias, categoria]);
                //exibir tabela com o produto incluído
                props.setExibirTabela(true);
            }
            else{
                props.setListaDeCategorias(props.listaDeCategorias.map((item) => {
                    if (item.codigo !== categoria.codigo)
                        return item
                    else
                        return categoria
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setCategoriaSelecionada({
                    codigo:0,
                    descricao:"",
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
        setCategoria({...categoria, [elemento]:valor});
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
                            value={categoria.codigo}
                            disabled={props.modoEdicao}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe o código da categoria!
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <FloatingLabel
                        label="Categoria:"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            id="descricao"
                            name="descricao"
                            value={categoria.descricao}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe a descrição da categoria!
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