function renderFamily(member) {
  const container = document.createElement('div');

  // family unit
  const familyDiv = document.createElement('div');
  familyDiv.className = 'family-unit';

  const husbandDiv = createMemberDiv(member);
  familyDiv.appendChild(husbandDiv);

  if (member.spouse) {
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
        // render female branch (stop deeper recursion)
        const childDiv = createMemberDiv(child);
        li.appendChild(childDiv);
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
        // male branch → recurse
        li.appendChild(renderFamily(child));
      }
      ul.appendChild(li);
    });

    container.appendChild(ul);
  }

  return container;
}

function createMemberDiv(person) {
  const div = document.createElement('div');
  div.className = 'member';
  if (person.avatar) {
    const img = document.createElement('img');
    img.src = person.avatar;
    div.appendChild(img);
  }
  div.appendChild(document.createTextNode(person.name));
  return div;
}

async function loadTree() {
  const response = await fetch('family.json');
  const data = await response.json();
  const treeDiv = document.getElementById('tree');
  treeDiv.appendChild(renderFamily(data));
}
loadTree();
