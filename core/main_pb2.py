# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: main.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\nmain.proto\x12\x08main_app\"\x07\n\x05\x45mpty\"6\n\x10\x43onnectionStatus\x12\x0f\n\x07message\x18\x01 \x01(\t\x12\x11\n\tconnected\x18\x02 \x01(\x08\"\x1d\n\nConfigList\x12\x0f\n\x07\x63onfigs\x18\x01 \x03(\t\"\x1a\n\nConfigName\x12\x0c\n\x04name\x18\x01 \x01(\t\"*\n\x06Status\x12\x0f\n\x07message\x18\x01 \x01(\t\x12\x0f\n\x07success\x18\x02 \x01(\x08\x32\xbd\x01\n\x07MainApp\x12>\n\x0f\x43heckConnection\x12\x0f.main_app.Empty\x1a\x1a.main_app.ConnectionStatus\x12\x39\n\x10\x46\x65tchConfigFiles\x12\x0f.main_app.Empty\x1a\x14.main_app.ConfigList\x12\x37\n\rUseConfigFile\x12\x14.main_app.ConfigName\x1a\x10.main_app.Statusb\x06proto3')



_EMPTY = DESCRIPTOR.message_types_by_name['Empty']
_CONNECTIONSTATUS = DESCRIPTOR.message_types_by_name['ConnectionStatus']
_CONFIGLIST = DESCRIPTOR.message_types_by_name['ConfigList']
_CONFIGNAME = DESCRIPTOR.message_types_by_name['ConfigName']
_STATUS = DESCRIPTOR.message_types_by_name['Status']
Empty = _reflection.GeneratedProtocolMessageType('Empty', (_message.Message,), {
  'DESCRIPTOR' : _EMPTY,
  '__module__' : 'main_pb2'
  # @@protoc_insertion_point(class_scope:main_app.Empty)
  })
_sym_db.RegisterMessage(Empty)

ConnectionStatus = _reflection.GeneratedProtocolMessageType('ConnectionStatus', (_message.Message,), {
  'DESCRIPTOR' : _CONNECTIONSTATUS,
  '__module__' : 'main_pb2'
  # @@protoc_insertion_point(class_scope:main_app.ConnectionStatus)
  })
_sym_db.RegisterMessage(ConnectionStatus)

ConfigList = _reflection.GeneratedProtocolMessageType('ConfigList', (_message.Message,), {
  'DESCRIPTOR' : _CONFIGLIST,
  '__module__' : 'main_pb2'
  # @@protoc_insertion_point(class_scope:main_app.ConfigList)
  })
_sym_db.RegisterMessage(ConfigList)

ConfigName = _reflection.GeneratedProtocolMessageType('ConfigName', (_message.Message,), {
  'DESCRIPTOR' : _CONFIGNAME,
  '__module__' : 'main_pb2'
  # @@protoc_insertion_point(class_scope:main_app.ConfigName)
  })
_sym_db.RegisterMessage(ConfigName)

Status = _reflection.GeneratedProtocolMessageType('Status', (_message.Message,), {
  'DESCRIPTOR' : _STATUS,
  '__module__' : 'main_pb2'
  # @@protoc_insertion_point(class_scope:main_app.Status)
  })
_sym_db.RegisterMessage(Status)

_MAINAPP = DESCRIPTOR.services_by_name['MainApp']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _EMPTY._serialized_start=24
  _EMPTY._serialized_end=31
  _CONNECTIONSTATUS._serialized_start=33
  _CONNECTIONSTATUS._serialized_end=87
  _CONFIGLIST._serialized_start=89
  _CONFIGLIST._serialized_end=118
  _CONFIGNAME._serialized_start=120
  _CONFIGNAME._serialized_end=146
  _STATUS._serialized_start=148
  _STATUS._serialized_end=190
  _MAINAPP._serialized_start=193
  _MAINAPP._serialized_end=382
# @@protoc_insertion_point(module_scope)