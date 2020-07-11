project(
	'link-store',
	'c',
	license: 'MIT',
	default_options: [
		'warning_level=3',
		'werror=true',
		'std=c18',
	],
)

cc = meson.get_compiler('c')

add_project_arguments('-pedantic', language: 'c')
add_project_arguments('-Wno-unused-parameter', language: 'c')
add_project_arguments('-Wno-unused-function', language: 'c')
add_project_arguments('-Wno-unused-result', language: 'c')
#As seen in OpenBSD httpd.
add_project_arguments('-Wstrict-prototypes', language: 'c')
add_project_arguments('-Wmissing-prototypes', language: 'c')
add_project_arguments('-Wmissing-declarations', language: 'c')
add_project_arguments('-Wshadow', language: 'c')
add_project_arguments('-Wpointer-arith', language: 'c')
add_project_arguments('-Wsign-compare', language: 'c')
add_project_arguments('-Wcast-qual', language: 'c')

deps = [
 dependency('kcgi', static:true),
 dependency('kcgi-html', static:true)
] 

sources = 'src/main.c'

executable(
	'link-store.cgi', 
	sources,
	dependencies : deps,
	link_args: ['-static']
) 
