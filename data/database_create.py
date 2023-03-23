from sqlalchemy import Table, Column, Integer, Float, String, Date, MetaData, ForeignKey
meta = MetaData()

usuario = Table(
   'usuario', meta, 
   Column('id_usuario', Integer, primary_key = True), 
   Column('InSexo', String), 
   Column('DtNascimento', Date), 
   Column('NmUsuario', String), 
   Column('InFilhos', String)
)

item = Table(
   'item', meta, 
   Column('id_item', Integer, primary_key = True), 
   Column('InCategoria', String), 
   Column('VlVolumeItem', Float), 
   Column('VlPeso', Float), 
   Column('NmItem', String)
)

mala = Table(
   'mala', meta, 
   Column('id_mala', Integer, primary_key = True), 
   Column('id_item', Integer, ForeignKey(item.id_item)), 
   Column('id_usuario', Integer, ForeignKey(usuario.id_usuario))
)

viagem = Table(
   'viagem', meta, 
   Column('id_viagem', Integer, primary_key = True), 
   Column('id_usuario', Integer, ForeignKey(usuario.id_usuario)), 
   Column('NmLocalDestino', String), 
   Column('DtInicioViagem', Date),
   Column('DtFimViagem', Date),
   Column('InMeioTransporte', String),
   Column('InTipoViagem', String)
)

viagem_mala = Table(
   'viagem_mala', meta, 
   Column('id_mala', Integer, ForeignKey(mala.id_mala), primary_key = True), 
   Column('id_viagem', Integer, ForeignKey(viagem.id_viagem), primary_key = True)
)

clima_dia = Table(
   'clima_dia', meta, 
   Column('id_viagem', Integer, ForeignKey(viagem.id_viagem), primary_key = True), 
   Column('DtViagem', Date, primary_key = True), 
   Column('VlTemperatura', Integer), 
   Column('VlSensacaoTermica', Integer),
   Column('NmClimaPredominante', String)
)

