// Carregar reservas do Local Storage ao iniciar
$(document).ready(function() {
    carregarReservas();
});

$('#formulario-reserva').submit(function(e) {
    e.preventDefault();

    var nomeProfessor = $('#nome-professor').val().trim();
    var equipamento = $('#equipamento-reserva').val().trim();
    var data = $('#data-reserva').val();
    var aula = $('#aula-reserva').val();
    var mensagem = $('#mensagem');

    mensagem.removeClass('alert-success alert-danger').hide();

    if (nomeProfessor === "" || equipamento === "" || !data || !aula) {
        mensagem
            .addClass('alert-danger')
            .text("Preencha todos os campos corretamente.")
            .fadeIn();
        return;
    }

    var reserva = { nomeProfessor, equipamento, data, aula };

    adicionarReserva(reserva);
    salvarNoLocalStorage(reserva);

    $('#formulario-reserva')[0].reset();
    mensagem
        .addClass('alert-success')
        .text("Reserva realizada com sucesso!")
        .fadeIn();

    setTimeout(function() {
        mensagem.fadeOut();
    }, 3000);
});

function adicionarReserva(reserva) {
    var dataFormatada = formatarData(reserva.data);

    var linha = `<tr>
        <td>${reserva.nomeProfessor}</td>
        <td>${reserva.equipamento}</td>
        <td>${dataFormatada}</td>
        <td>${reserva.aula}ª Aula</td>
        <td><button class="btn btn-danger excluir">Excluir</button></td>
    </tr>`;
    $('#tabela-reservas tbody').append(linha);
}

function salvarNoLocalStorage(reserva) {
    var reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

function carregarReservas() {
    var reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.forEach(adicionarReserva);
}

function formatarData(data) {
    var partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0].slice(2)}`;
}

$(document).on('click', '.excluir', function() {
    var linha = $(this).closest('tr');
    var nomeProfessor = linha.find('td:eq(0)').text();
    var equipamento = linha.find('td:eq(1)').text();
    var data = linha.find('td:eq(2)').text();
    var aula = linha.find('td:eq(3)').text().replace('ª Aula', '');

    var reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas = reservas.filter(function(reserva) {
        return !(reserva.nomeProfessor === nomeProfessor &&
                 reserva.equipamento === equipamento &&
                 reserva.data === formatarDataISO(data) &&
                 reserva.aula === aula);
    });

    localStorage.setItem('reservas', JSON.stringify(reservas));
    linha.remove();

    var mensagem = $('#mensagem');
    mensagem.removeClass('alert-success alert-danger').hide();
    mensagem
        .addClass('alert-success')
        .text("Reserva excluída com sucesso!")
        .fadeIn();

    setTimeout(function() {
        mensagem.fadeOut();
    }, 3000);
});

function formatarDataISO(data) {
    var partes = data.split('/');
    return `20${partes[2]}-${partes[1]}-${partes[0]}`;
}
