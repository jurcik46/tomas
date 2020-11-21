# tomas


npm install
npm install nodeamon -g




# db

create table articles
(
	id int  AUTO_INCREMENT PRIMARY KEY,
	content text null,
	author_id int,
	name nvarchar(300) null
);

create unique index articles_id_uindex
	on articles (id);


create table author
(
    id int  AUTO_INCREMENT PRIMARY KEY,
	first_name nvarchar(100) null,
	second_name nvarchar(100) null,
	email nvarchar(100) not null
);

create unique index author_email_uindex
	on author (email);

create unique index author_id_uindex
	on author (id);


alter table articles
	add constraint articles_author_id_fk
		foreign key (author_id) references author (id)
			on update cascade on delete cascade;
