function renderFamily(member) {
  const container = document.createElement('div');

  // family unit
  const familyDiv = document.createElement('div');
  familyDiv.className = 'family-unit';

  const husbandDiv = createMemberDiv(member);
  familyDiv.appendChild(husbandDiv);

  // connector line between spouses
  if (member.spouse) {
    const connector = document.createElement('div');
    connector.className = 'connector';
    familyDiv.appendChild(connector);

    const spouseDiv = createMemberDiv(member.spouse);
    familyDiv.appendChild(spouseDiv);
  }

  container.appendChild(familyDiv);

  // children
  if (member.children && member.children.length > 0) {
    const ul = document.createElement('ul');
    ul.className = 'children';

    member.children.forEach(child => {
      const li = document.createElement('li');
      if (child.gender === 'female') {
        li.appendChild(createMemberDiv(child));
        if (child.spouse) {
          li.appendChild(createMemberDiv(child.spouse));
        }
        if (child.children && child.children.length > 0) {
          const subUl = document.createElement('ul');
          subUl.className = 'children';
          child.children.forEach(grandchild => {
            const subLi = document.createElement('li');
            subLi.appendChild(createMemberDiv(grandchild));
            subUl.appendChild(subLi);
          });
          li.appendChild(subUl);
        }
      } else {
        li.appendChild(renderFamily(child));
      }
      ul.appendChild(li);
    });

    container.appendChild(ul);
  }

  return container;
}
